import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/admin.controller.js";
import { getDashboard } from "../controller/dashboard.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

router.get("/dashboard", getDashboard);

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
