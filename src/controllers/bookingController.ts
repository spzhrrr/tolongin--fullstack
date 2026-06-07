import { Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware";

import AppError from "../utils/AppError";

import {
  createBookingService,
  getBookingsService,
  getBookingByIdService,
  updateBookingStatusService,
} from "../services/bookingService";

import { getServiceByIdService } from "../services/serviceService";

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const serviceId = Number(req.params.serviceId);

    const buyerId = req.user?.id;

    const service = await getServiceByIdService(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.user_id === buyerId) {
      return res.status(400).json({
        message: "You cannot book your own service",
      });
    }

    await createBookingService(serviceId, buyerId as number);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getBookingsService();

    res.json(bookings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);

    const { status } = req.body;

    const booking = await getBookingByIdService(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user_id !== req.user?.id) {
      return res.status(403).json({
        message: "You are not authorized to update this booking",
      });
    }

    const allowedStatuses = ["accepted", "rejected", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    await updateBookingStatusService(bookingId, status);

    res.json({
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update booking status",
    });
  }
};
