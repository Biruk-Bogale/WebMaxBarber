import { Request, Response } from "express";
import * as bookingService from "../services/booking.service.js";
import { BookingStatus } from "../../generated/prisma/index.js";

export const getBookings = async (req: Request, res: Response) => {
  try {
    const status =
      typeof req.query.status === "string"
        ? (req.query.status as BookingStatus)
        : undefined;

    const bookings = await bookingService.getBookings({
      date: typeof req.query.date === "string" ? req.query.date : undefined,
      status,
      barberId:
        typeof req.query.barberId === "string" ? req.query.barberId : undefined,
      customerId:
        typeof req.query.customerId === "string"
          ? req.query.customerId
          : undefined,
    });

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get bookings",
    });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getBookingById(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Booking not found",
    });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer, serviceId, barberId, date, time, notes } = req.body;

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !serviceId ||
      !barberId ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, barber, date and time are required",
      });
    }

    const booking = await bookingService.createBooking({
      customer,
      serviceId,
      barberId,
      date,
      time,
      notes,
    });

    return res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create booking",
    });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.updateBooking(
      req.params.id as string,
      req.body,
    );

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update booking",
    });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    await bookingService.deleteBooking(req.params.id as string);

    return res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete booking",
    });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.confirmBooking(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to confirm booking",
    });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id as string);

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to cancel booking",
    });
  }
};

export const completeBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.completeBooking(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to complete booking",
    });
  }
};

export const availability = async (req: Request, res: Response) => {
  try {
    const barberId = String(req.query.barberId || "");

    const date = String(req.query.date || "");

    if (!barberId || !date) {
      return res.status(400).json({
        success: false,
        message: "barberId and date are required",
      });
    }

    const bookings = await bookingService.getAvailability({
      barberId,
      date,
    });

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get availability",
    });
  }
};

export const availableSlots = async (req: Request, res: Response) => {
  try {
    const barberId = String(req.query.barberId || "");

    const serviceId = String(req.query.serviceId || "");

    const date = String(req.query.date || "");

    if (!barberId || !serviceId || !date) {
      return res.status(400).json({
        success: false,
        message: "barberId, serviceId and date are required",
      });
    }

    const result = await bookingService.getAvailableSlots({
      barberId,
      serviceId,
      date,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get available slots",
    });
  }
};
