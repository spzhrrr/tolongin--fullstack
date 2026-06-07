import express from "express";
import cors from "cors";

import serviceRoutes from "./routes/serviceRoutes";
import userRoutes from "./routes/userRoutes";

import { loggerMiddleware } from "./middleware/loggerMiddleware";

import bookingRoutes from "./routes/bookingRoutes";

import reviewRoutes from "./routes/reviewRoutes";

import dashboardRoutes from "./routes/dashboardRoutes";

import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/services", serviceRoutes);

app.use("/api/users", userRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/dashboard", dashboardRoutes);

app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

export default app;
