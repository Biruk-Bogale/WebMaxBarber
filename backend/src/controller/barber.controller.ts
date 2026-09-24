import { Request, Response } from "express";
import * as barberService from "../services/barber.service.js";

export const getBarbers = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === "true";

    const barbers = await barberService.getBarbers(includeInactive);

    return res.json({
      success: true,
      data: barbers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get barbers",
    });
  }
};

export const getBarber = async (req: Request, res: Response) => {
  try {
    const barber = await barberService.getBarberById(req.params.id as string);

    return res.json({
      success: true,
      data: barber,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Barber not found",
    });
  }
};

export const createBarber = async (req: Request, res: Response) => {
  try {
    const barber = await barberService.createBarber(req.body);

    return res.status(201).json({
      success: true,
      data: barber,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create barber",
    });
  }
};

export const updateBarber = async (req: Request, res: Response) => {
  try {
    const barber = await barberService.updateBarber(
      req.params.id as string,
      req.body,
    );

    return res.json({
      success: true,
      data: barber,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update barber",
    });
  }
};

export const deleteBarber = async (req: Request, res: Response) => {
  try {
    const barber = await barberService.deleteBarber(req.params.id as string);

    return res.json({
      success: true,
      data: barber,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete barber",
    });
  }
};
