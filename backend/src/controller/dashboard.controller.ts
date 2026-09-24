import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service.js";

export const getDashboard = async (_req: Request, res: Response) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    return res.json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to load dashboard",
    });
  }
};
