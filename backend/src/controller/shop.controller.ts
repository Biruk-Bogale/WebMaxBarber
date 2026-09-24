import { Request, Response } from "express";
import * as shopService from "../services/shop.service.js";

export const getShop = async (_req: Request, res: Response) => {
  try {
    const shop = await shopService.getShop();

    return res.json({
      success: true,
      data: shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get shop settings",
    });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const shop = await shopService.updateShop(req.body);

    return res.json({
      success: true,
      data: shop,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update shop settings",
    });
  }
};
