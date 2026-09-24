import { Router } from "express";

import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import serviceRoutes from "./service.routes.js";
import barberRoutes from "./barber.routes.js";
import customerRoutes from "./customer.routes.js";
import bookingRoutes from "./booking.routes.js";
import shopRoutes from "./shop.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use("/services", serviceRoutes);

router.use("/barbers", barberRoutes);

router.use("/customers", customerRoutes);

router.use("/bookings", bookingRoutes);

router.use("/shop", shopRoutes);

export default router;
