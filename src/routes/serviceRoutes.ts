import { Router } from "express";

import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController";

import { authMiddleware } from "../middleware/authMiddleware";

import upload from "../config/multer";

const router = Router();

router.get("/", getAllServices);

router.get("/:id", getServiceById);

router.post("/", authMiddleware, upload.single("image"), createService);
router.put("/:id", authMiddleware, updateService);

router.delete("/:id", authMiddleware, deleteService);

export default router;
