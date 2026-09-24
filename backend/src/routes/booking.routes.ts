import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  confirmBooking,
  cancelBooking,
  completeBooking,
  availability,
  availableSlots,
} from "../controller/booking.controller.js";
import {
  googleCalendar,
  appleCalendar,
} from "../controller/calendar.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/availability", availability);

router.get("/available-slots", availableSlots);

router.get("/", authenticate, requireAdmin, getBookings);

router.post("/", createBooking);

router.get("/:id/calendar/google", googleCalendar);

router.get("/:id/calendar/ics", appleCalendar);

router.patch("/:id/confirm", authenticate, requireAdmin, confirmBooking);

router.patch("/:id/cancel", authenticate, requireAdmin, cancelBooking);

router.patch("/:id/complete", authenticate, requireAdmin, completeBooking);

router.get("/:id", authenticate, requireAdmin, getBooking);

router.patch("/:id", authenticate, requireAdmin, updateBooking);

router.delete("/:id", authenticate, requireAdmin, deleteBooking);

export default router;
