import { Request, Response } from "express";

import { getDashboardStatsService } from "../services/dashboardService";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStatsService();

    res.json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};
