import { Booking } from "../../generated/prisma/index.js";

const SHOP_TIMEZONE = process.env.SHOP_TIMEZONE || "Africa/Johannesburg";

const SHOP_NAME = "The Craft Barber";

const SHOP_ADDRESS = "42 Long Street, Cape Town, South Africa";

const escapeGoogle = (value: string) => {
  return encodeURIComponent(value);
};

const formatGoogleDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHOP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get(
    "minute",
  )}${get("second")}`;
};

const formatICSDate = (date: Date) => {
  return formatGoogleDate(date);
};

const escapeICS = (value: string) => {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
};

export const createGoogleCalendarUrl = (
  booking: Booking & {
    service: {
      name: string;
    };
    barber: {
      name: string;
    };
  },
) => {
  const start = formatGoogleDate(booking.startTime);

  const end = formatGoogleDate(booking.endTime);

  const title = `${SHOP_NAME} - ${booking.service.name}`;

  const details =
    `Appointment with ${booking.barber.name}. ` +
    `Booking reference: ${booking.id}`;

  return (
    "https://calendar.google.com/calendar/render" +
    "?action=TEMPLATE" +
    `&text=${escapeGoogle(title)}` +
    `&dates=${start}/${end}` +
    `&details=${escapeGoogle(details)}` +
    `&location=${escapeGoogle(SHOP_ADDRESS)}`
  );
};

export const createICS = (
  booking: Booking & {
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    service: {
      name: string;
    };
    barber: {
      name: string;
    };
  },
) => {
  const uid = `${booking.id}@thecraftbarber.com`;

  const description =
    `Service: ${booking.service.name}\\n` +
    `Barber: ${booking.barber.name}\\n` +
    `Customer: ${booking.customer.name}\\n` +
    `Phone: ${booking.customer.phone}\\n` +
    `Booking reference: ${booking.id}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Craft Barber//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART;TZID=${SHOP_TIMEZONE}:${formatICSDate(booking.startTime)}`,
    `DTEND;TZID=${SHOP_TIMEZONE}:${formatICSDate(booking.endTime)}`,
    `SUMMARY:${escapeICS(`${SHOP_NAME} - ${booking.service.name}`)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(SHOP_ADDRESS)}`,
    `ORGANIZER;CN=${escapeICS(SHOP_NAME)}:mailto:info@thecraftbarber.com`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};
