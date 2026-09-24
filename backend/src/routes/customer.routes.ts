import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customer.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", authenticate, requireAdmin, getCustomers);

router.get("/:id", authenticate, requireAdmin, getCustomer);

router.post("/", createCustomer);

router.patch("/:id", authenticate, requireAdmin, updateCustomer);

router.delete("/:id", authenticate, requireAdmin, deleteCustomer);

export default router;
