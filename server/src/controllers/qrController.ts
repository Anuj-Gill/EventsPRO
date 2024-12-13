import { Request, Response, NextFunction } from "express";
import { getEventId } from "../services/eventServices";
import { markUserAttendance } from "../services/qrServices";

export async function attendance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ message: "Token is required!" });
      return;
    }

    const participant = await getEventId(token as string);

    if (!participant) {
      res.status(404).json({ message: "Invalid or expired token!" });
      return;
    }

    res.status(200).json({
      message: "Token verified successfully!",
      data: {
        user: participant.user,
        event: participant.event,
        attendance: participant.hasAttended, // Indicates attendance status
      },
    });
  } catch (error) {
    console.error("Error verifying attendance:", error);
    next(error);
  }
}

export async function mark(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ message: "Token is required!" });
      return;
    }

    const participant = await markUserAttendance(token);

    if (!participant) {
      res.status(404).json({ message: "Invalid or expired token!" });
      return;
    }

    res.status(200).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    next(error);
  }
}
