import { Router } from "express";
import {
  login,
  logout,
  refresh,
  getMe,
} from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/logout", logout);

router.get("/me", authenticate, getMe);

export default router;
