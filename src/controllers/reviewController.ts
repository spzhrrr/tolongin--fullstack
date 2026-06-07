import { Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware";

import {
  createReviewService,
  getReviewsByServiceService,
  checkBookingExistsService,
} from "../services/reviewService";

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const serviceId = Number(req.params.serviceId);

    const reviewerId = req.user?.id;

    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const bookingExists = await checkBookingExistsService(
      serviceId,
      reviewerId as number,
    );

    if (!bookingExists) {
      return res.status(403).json({
        message: "You must book this service before reviewing",
      });
    }

    await createReviewService(serviceId, reviewerId as number, rating, comment);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

export const getReviewsByService = async (req: AuthRequest, res: Response) => {
  try {
    const serviceId = Number(req.params.serviceId);

    const reviews = await getReviewsByServiceService(serviceId);

    res.json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};
