import express, { Application, Express } from "express";
import "dotenv/config";
import authRoutes from "../routes/authRoutes";
import infoRoutes from "../routes/info.routes";
import eventRoutes from "../routes/eventRoutes";
import committeeRoutes from "../routes/committeeRoutes";
import qrRoutes from "../routes/qrRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import cors from "cors";
import { error } from "console";

export default function ExpressApp(): Application {
  const app: Application = express();
  const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://eventspro.tech", // Production
    "http://localhost:3000", // Another allowed origin
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          // If the origin is in the allowedOrigins list, allow it
          callback(null, true);
        } else {
          // If the origin is not in the allowedOrigins list, reject it
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // Allow credentials
    })
  );
  app.use(express.json({ limit: "3mb" }));

  app.use("/auth", authRoutes);
  app.use("/user", infoRoutes);
  app.use("/event", eventRoutes);
  app.use("/committee", committeeRoutes);
  app.use("/qrcode", qrRoutes);

  app.get("/", (req, res) => {
    res.status(200).json({ message: "up" });
  });

  app.use(errorHandler);

  return app;
}
