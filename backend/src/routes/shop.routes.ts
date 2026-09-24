import { Router } from "express";
import { getShop, updateShop } from "../controller/shop.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getShop);

router.patch("/", authenticate, requireAdmin, updateShop);

export default router;
