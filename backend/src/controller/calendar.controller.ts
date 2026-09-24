import { Request, Response } from "express";
import * as bookingService from "../services/booking.service.js";
import { createGoogleCalendarUrl, createICS } from "../utils/calender.js";

export const googleCalendar = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getBookingById(
      req.params.id as string,
    );

    if (booking.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Cancelled bookings cannot be added to a calendar",
      });
    }

    const url = createGoogleCalendarUrl(booking);

    return res.redirect(url);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Booking not found",
    });
  }
};

export const appleCalendar = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getBookingById(
      req.params.id as string,
    );

    if (booking.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Cancelled bookings cannot be added to a calendar",
      });
    }

    const ics = createICS(booking);

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="booking-${booking.id}.ics"`,
    );

    return res.send(ics);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Booking not found",
    });
  }
};
