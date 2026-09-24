import { Request, Response } from "express";
import * as adminService from "../services/admin.service.js";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await adminService.getUsers();

    return res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get users",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await adminService.getUserById(req.params.id as string);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "User not found",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await adminService.createUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create admin user",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password && req.body.password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await adminService.updateUser(
      req.params.id as string,
      req.body,
    );

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update admin user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await adminService.deleteUser(req.params.id as string, req.user!.userId);

    return res.json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete admin user",
    });
  }
};
