import { Router } from "express";

import { getMyProfile, updateMyProfile } from "../controllers/userController";

import { authMiddleware } from "../middleware/authMiddleware";

import upload from "../config/multer";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);

router.put("/me", authMiddleware, upload.single("avatar"), updateMyProfile);

export default router;
