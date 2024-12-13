import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error("Error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        res.status(409).json({ message: "Unique constraint violated!" });
        return;
      case "P2025":
        res.status(404).json({ message: "Record not found!" });
        return;
      default:
        res.status(500).json({ message: "Database error occurred!" });
        return;
    }
  }

  // Handle generic errors
  res.status(500).json({ message: "An unexpected error occurred!" });
}
