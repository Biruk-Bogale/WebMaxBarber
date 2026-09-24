import { Router } from "express";
import {
  getBarbers,
  getBarber,
  createBarber,
  updateBarber,
  deleteBarber,
} from "../controller/barber.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getBarbers);

router.get("/:id", getBarber);

router.post("/", authenticate, requireAdmin, createBarber);

router.patch("/:id", authenticate, requireAdmin, updateBarber);

router.delete("/:id", authenticate, requireAdmin, deleteBarber);

export default router;
