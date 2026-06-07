import { Router } from "express";

import {
  createReview,
  getReviewsByService,
} from "../controllers/reviewController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:serviceId", authMiddleware, createReview);

router.get("/:serviceId", getReviewsByService);

export default router;
