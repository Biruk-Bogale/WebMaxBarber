import { Router } from "express";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controller/service.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getServices);

router.get("/:id", getService);

router.post("/", authenticate, requireAdmin, createService);

router.patch("/:id", authenticate, requireAdmin, updateService);

router.delete("/:id", authenticate, requireAdmin, deleteService);

export default router;
