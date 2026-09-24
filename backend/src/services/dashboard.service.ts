import { BookingStatus } from "../../generated/prisma/index.js";
import { prisma } from "../libs/prisma.js";

export const getDashboard = async () => {
  const today = new Date();

  const startOfDay = new Date(today);

  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);

  endOfDay.setHours(23, 59, 59, 999);

  const [
    totalBookings,
    todayBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    totalCustomers,
    activeBarbers,
    activeServices,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count(),

    prisma.booking.count({
      where: {
        bookingDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    }),

    prisma.booking.count({
      where: {
        status: BookingStatus.PENDING,
      },
    }),

    prisma.booking.count({
      where: {
        status: BookingStatus.CONFIRMED,
      },
    }),

    prisma.booking.count({
      where: {
        status: BookingStatus.COMPLETED,
      },
    }),

    prisma.customer.count(),

    prisma.barber.count({
      where: {
        isActive: true,
      },
    }),

    prisma.service.count({
      where: {
        isActive: true,
      },
    }),

    prisma.booking.findMany({
      take: 10,
      include: {
        customer: true,
        barber: true,
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    statistics: {
      totalBookings,
      todayBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalCustomers,
      activeBarbers,
      activeServices,
    },
    recentBookings,
  };
};
