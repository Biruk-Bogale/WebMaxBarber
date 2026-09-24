import { Request, Response } from "express";
import * as serviceService from "../services/service.service.js";

export const getServices = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === "true";

    const services = await serviceService.getServices(includeInactive);

    return res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get services",
    });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.getServiceById(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Service not found",
    });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.createService(req.body);

    return res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create service",
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.updateService(
      req.params.id as string,
      req.body,
    );

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update service",
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.deleteService(req.params.id as string);

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete service",
    });
  }
};
