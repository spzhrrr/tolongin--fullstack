import { Router } from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:serviceId", authMiddleware, createBooking);

router.get("/", authMiddleware, getBookings);

router.put("/:bookingId/status", authMiddleware, updateBookingStatus);

export default router;
