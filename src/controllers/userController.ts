import { Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware";

import {
  getUserProfileService,
  updateUserProfileService,
} from "../services/userService";

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await getUserProfileService(userId as number);

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const bio = req.body.bio;

    const phone = req.body.phone;

    const location = req.body.location;

    const avatar = (req as any).file
      ? `/uploads/${(req as any).file.filename}`
      : null;

    await updateUserProfileService(
      userId as number,
      bio,
      avatar,
      phone,
      location,
    );

    res.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
