import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  addAcademicInfo,
  findUserByEmail,
  updateUserDataService,
  addFeedbackService,
  getFeedbacksService,
  getUserStatsService
} from "../services/userService";
import { AcademicInfoRequestBody } from "../interfaces/authInterfaces";

const prisma = new PrismaClient();

export async function infoInsert(
  req: Request<{}, {}, AcademicInfoRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const { rollNumber, department, year, division, jwtPayload } = req.body;
  try {
    const info = await addAcademicInfo({
      rollNo: rollNumber,
      department,
      year,
      division,
      email: jwtPayload.email,
    });
    res.status(201).json({ message: "Academic info updated successfully!" });
  } catch (error) {
    console.error("Error inserting academic info:", error);
    next(error);
  }
}

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload } = req.body;

    const user = await findUserByEmail(jwtPayload?.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User info", user });
  } catch (error) {
    next(error);
  }
}

export async function updateUserData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload, details } = req.body;

    const user = await findUserByEmail(jwtPayload?.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const update = await updateUserDataService(jwtPayload?.email, details);

    if (update) {
      res.status(200).json({ message: "User info updated!", user });
      return;
    }
  } catch (error) {
    next(error);
  }
}

export async function addFeedback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload, details } = req.body;

    const user = await findUserByEmail(jwtPayload?.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const feedback = await addFeedbackService(jwtPayload.email, details);

    if (feedback) {
      res.status(200).json({ message: "User feedback added!", feedback });
      return;
    }
  } catch (error) {
    next(error);
  }
}

export async function getFeedbacks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const feedbacks = await getFeedbacksService();
    if (!feedbacks) {
      res.status(404).json({ message: "No feedbacks yet!" });
      return;
    }

    res.status(200).json({ message: "Feedbakcs found", feedbacks });
  } catch (error) {
    next(error);
  }
}

export async function getUserStats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload } = req.body;
    const user = await findUserByEmail(jwtPayload?.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userStats = await getUserStatsService(Number(user.id));
    const totalEvents = await prisma.event.count();

    res.status(200).json({ message: "User stats", userStats, totalEvents })
  } catch (error) {
    next(error);
  }
}
