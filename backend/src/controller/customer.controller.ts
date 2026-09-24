import { Request, Response } from "express";
import * as customerService from "../services/customer.service.js";

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await customerService.getCustomers();

    return res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get customers",
    });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.getCustomerById(
      req.params.id as string,
    );

    return res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Customer not found",
    });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const customer = await customerService.createCustomer({
      name,
      email,
      phone,
    });

    return res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create customer",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(
      req.params.id as string,
      req.body,
    );

    return res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update customer",
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await customerService.deleteCustomer(req.params.id as string);

    return res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete customer",
    });
  }
};
