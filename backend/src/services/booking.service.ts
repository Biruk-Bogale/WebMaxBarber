// import {
//   BookingStatus,
//   Prisma,
// } from "@prisma/client";
// import { prisma } from "../lib/prisma";

import { BookingStatus, Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../libs/prisma.js";

const SHOP_TIMEZONE = process.env.SHOP_TIMEZONE || "Africa/Johannesburg";

const OPENING_HOUR = 9;
const CLOSING_HOUR = 18;
const SLOT_INTERVAL = 15;

const getDateParts = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  if (
    !year ||
    !month ||
    !day ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new Error("Invalid date");
  }

  return { year, month, day };
};

const createDateTime = (date: string, time: string) => {
  const { year, month, day } = getDateParts(date);

  const [hour = NaN, minute = NaN] = time.split(":").map(Number);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error("Invalid time");
  }

  /*
   * The shop is assumed to operate in Africa/Johannesburg.
   * Prisma stores the resulting instant as DateTime.
   */
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

  const parts = formatter
    .formatToParts(utcGuess)
    .reduce<Record<string, string>>((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  const localAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );

  const offset = utcGuess.getTime() - localAsUtc;

  return new Date(utcGuess.getTime() + offset);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

const validateBusinessHours = (start: Date, end: Date) => {
  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const [startHour = 0, startMinute = 0] = startTime.split(":").map(Number);

  const [endHour = 0, endMinute = 0] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;

  const endMinutes = endHour * 60 + endMinute;

  if (startMinutes < OPENING_HOUR * 60) {
    throw new Error("Booking is before opening hours");
  }

  if (endMinutes > CLOSING_HOUR * 60) {
    throw new Error("Booking is after closing hours");
  }
};

const ensureNoConflict = async (
  barberId: string,
  startTime: Date,
  endTime: Date,
  excludeBookingId?: string,
) => {
  const conflict = await prisma.booking.findFirst({
    where: {
      barberId,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      ...(excludeBookingId && {
        NOT: {
          id: excludeBookingId,
        },
      }),
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  });

  if (conflict) {
    throw new Error("This barber is already booked for the selected time");
  }
};

export const getBookings = async (params: {
  date?: string;
  status?: BookingStatus;
  barberId?: string;
  customerId?: string;
}) => {
  const where: Prisma.BookingWhereInput = {};

  if (params.date) {
    const start = createDateTime(params.date, "00:00");

    const end = createDateTime(params.date, "23:59");

    where.bookingDate = {
      gte: start,
      lte: end,
    };
  }

  if (params.status) {
    where.status = params.status;
  }

  if (params.barberId) {
    where.barberId = params.barberId;
  }

  if (params.customerId) {
    where.customerId = params.customerId;
  }

  return prisma.booking.findMany({
    where,
    include: {
      customer: true,
      barber: true,
      service: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

export const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const createBooking = async (data: {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  notes?: string;
}) => {
  const service = await prisma.service.findUnique({
    where: {
      id: data.serviceId,
    },
  });

  if (!service || !service.isActive) {
    throw new Error("Service not found");
  }

  const barber = await prisma.barber.findUnique({
    where: {
      id: data.barberId,
    },
  });

  if (!barber || !barber.isActive) {
    throw new Error("Barber not found");
  }

  const startTime = createDateTime(data.date, data.time);

  const endTime = new Date(startTime.getTime() + service.duration * 60 * 1000);

  validateBusinessHours(startTime, endTime);

  if (startTime <= new Date()) {
    throw new Error("Cannot create a booking in the past");
  }

  await ensureNoConflict(barber.id, startTime, endTime);

  const bookingDate = createDateTime(data.date, "00:00");

  const customer = await prisma.customer.upsert({
    where: {
      email: data.customer.email.toLowerCase().trim(),
    },
    update: {
      name: data.customer.name.trim(),
      phone: data.customer.phone.trim(),
    },
    create: {
      name: data.customer.name.trim(),
      email: data.customer.email.toLowerCase().trim(),
      phone: data.customer.phone.trim(),
    },
  });

  return prisma.booking.create({
    data: {
      customerId: customer.id,
      barberId: barber.id,
      serviceId: service.id,
      bookingDate,
      startTime,
      endTime,
      status: BookingStatus.PENDING,
      notes: data.notes?.trim(),
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const updateBooking = async (
  id: string,
  data: {
    serviceId?: string;
    barberId?: string;
    date?: string;
    time?: string;
    notes?: string;
    status?: BookingStatus;
  },
) => {
  const current = await getBookingById(id);

  const serviceId = data.serviceId || current.serviceId;

  const barberId = data.barberId || current.barberId;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service || !service.isActive) {
    throw new Error("Service not found");
  }

  const date =
    data.date ||
    new Intl.DateTimeFormat("en-CA", {
      timeZone: SHOP_TIMEZONE,
    }).format(current.bookingDate);

  const time = data.time || formatTime(current.startTime);

  const startTime = createDateTime(date, time);

  const endTime = new Date(startTime.getTime() + service.duration * 60 * 1000);

  validateBusinessHours(startTime, endTime);

  await ensureNoConflict(barberId, startTime, endTime, id);

  const bookingDate = createDateTime(date, "00:00");

  return prisma.booking.update({
    where: { id },
    data: {
      serviceId,
      barberId,
      bookingDate,
      startTime,
      endTime,
      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
      ...(data.status !== undefined && {
        status: data.status,
      }),
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const confirmBooking = async (id: string) => {
  const booking = await getBookingById(id);

  if (booking.status !== BookingStatus.PENDING) {
    throw new Error("Only pending bookings can be confirmed");
  }

  return prisma.booking.update({
    where: { id },
    data: {
      status: BookingStatus.CONFIRMED,
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const cancelBooking = async (id: string) => {
  const booking = await getBookingById(id);

  if (booking.status === BookingStatus.COMPLETED) {
    throw new Error("Completed bookings cannot be cancelled");
  }

  if (booking.status === BookingStatus.CANCELLED) {
    throw new Error("Booking is already cancelled");
  }

  return prisma.booking.update({
    where: { id },
    data: {
      status: BookingStatus.CANCELLED,
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const completeBooking = async (id: string) => {
  const booking = await getBookingById(id);

  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new Error("Only confirmed bookings can be completed");
  }

  return prisma.booking.update({
    where: { id },
    data: {
      status: BookingStatus.COMPLETED,
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const deleteBooking = async (id: string) => {
  const booking = await getBookingById(id);

  if (booking.status === BookingStatus.CONFIRMED) {
    throw new Error(
      "Confirmed bookings should be cancelled instead of deleted",
    );
  }

  return prisma.booking.delete({
    where: { id },
  });
};

export const getAvailability = async (params: {
  barberId: string;
  date: string;
}) => {
  const barber = await prisma.barber.findUnique({
    where: {
      id: params.barberId,
    },
  });

  if (!barber || !barber.isActive) {
    throw new Error("Barber not found");
  }

  const dayStart = createDateTime(params.date, "00:00");

  const dayEnd = createDateTime(params.date, "23:59");

  const bookings = await prisma.booking.findMany({
    where: {
      barberId: params.barberId,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      startTime: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return bookings;
};

export const getAvailableSlots = async (params: {
  barberId: string;
  serviceId: string;
  date: string;
}) => {
  const barber = await prisma.barber.findUnique({
    where: {
      id: params.barberId,
    },
  });

  if (!barber || !barber.isActive) {
    throw new Error("Barber not found");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: params.serviceId,
    },
  });

  if (!service || !service.isActive) {
    throw new Error("Service not found");
  }

  const dayStart = createDateTime(params.date, "00:00");

  const dayEnd = createDateTime(params.date, "23:59");

  const bookings = await prisma.booking.findMany({
    where: {
      barberId: params.barberId,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      startTime: {
        lte: dayEnd,
      },
      endTime: {
        gte: dayStart,
      },
    },
  });

  const slots: Array<{
    time: string;
    available: boolean;
  }> = [];

  const startMinutes = OPENING_HOUR * 60;
  const endMinutes = CLOSING_HOUR * 60 - service.duration;

  for (
    let minutes = startMinutes;
    minutes <= endMinutes;
    minutes += SLOT_INTERVAL
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    const time = `${String(hour).padStart(
      2,
      "0",
    )}:${String(minute).padStart(2, "0")}`;

    const slotStart = createDateTime(params.date, time);

    const slotEnd = new Date(
      slotStart.getTime() + service.duration * 60 * 1000,
    );

    const conflict = bookings.some(
      (booking) => booking.startTime < slotEnd && booking.endTime > slotStart,
    );

    const past = slotStart <= new Date();

    slots.push({
      time,
      available: !conflict && !past,
    });
  }

  return {
    date: params.date,
    barber,
    service,
    slots,
  };
};
