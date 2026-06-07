import { Request, Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware";

import AppError from "../utils/AppError";

import {
  getAllServicesService,
  getServiceByIdService,
  createServiceService,
  updateServiceService,
  deleteServiceService,
} from "../services/serviceService";

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const services = await getAllServicesService(
      search as string,
      category as string,
    );

    res.json(services);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const service = await getServiceByIdService(id);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch service",
    });
  }
};

export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const title = req.body.title;

    const price = Number(req.body.price);

    const categoryId = Number(req.body.categoryId);

    const image = (req as any).file
      ? `/uploads/${(req as any).file.filename}`
      : null;

    const userId = req.user?.id;

    if (!title || !price || !categoryId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    await createServiceService(
      title,
      price,
      userId as number,
      categoryId,
      image,
    );

    res.status(201).json({
      success: true,
      message: "Service created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create service",
    });
  }
};

export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const title = req.body.title;

    const price = Number(req.body.price);

    const categoryId = Number(req.body.categoryId);

    const image = (req as any).file
      ? `/uploads/${(req as any).file.filename}`
      : null;

    const existingService = await getServiceByIdService(id);

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (existingService.user_id !== req.user?.id) {
      return res.status(403).json({
        message: "You are not authorized to update this service",
      });
    }

    await updateServiceService(id, title, price, categoryId, image);

    res.json({
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update service",
    });
  }
};

export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingService = await getServiceByIdService(id);

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (existingService.user_id !== req.user?.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this service",
      });
    }

    await deleteServiceService(id);

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete service",
    });
  }
};
