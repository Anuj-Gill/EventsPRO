import { Request, Response, NextFunction } from "express";
import {
  createEventRequest,
  registerRequestBody,
  updateEventRequest,
} from "../interfaces/eventInterfaces";
import {
  checkEventExists,
  createNewEvent,
  registerForEvent,
  registerTeamForEvent,
  checkForTeam,
  checkAlreadyJoinedTeam,
  getUpcomingEvents,
  getCommitteeEvents,
  getEventDetailsByName,
  checkIfAlreadyRegistered,
  getTeamMembers,
  getEvents,
  updateEventService,
  checkEventExistsById,
  deleteEventService,
  getEventParticipantService,
} from "../services/eventServices";
import { getCommitteeId, getPubsInfo } from "../services/committeeServices";
import { findUserByEmail } from "../services/userService";
import { generateTeamCode } from "../util/TeamCode";
import { generateQrCodeToken, generateQRCode } from "../util/qrCode";
import { sendEmail } from "../util/mail";

export async function createEvent(
  req: Request<{}, {}, createEventRequest>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventDetails, jwtPayload, role } = req.body;
    const eventExists = await checkEventExists(eventDetails.eventName);
    if (eventExists) {
      res.status(409).json({ message: "Event with this name already exists!" });
      return;
    }

    const cId = await getCommitteeId(role);

    const newEvent = await createNewEvent(eventDetails, Number(cId));

    res.status(200).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function updateEvent(
  req: Request<{}, {}, updateEventRequest>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventDetails, jwtPayload, role, eventId } = req.body;
    const eventExists = await checkEventExistsById(eventId);
    if (!eventExists) {
      res.status(404).json({ message: "Event with this name doesn't exists!" });
      return;
    }

    const updatedEvent = await updateEventService(
      Number(eventId),
      eventDetails,
    );

    res.status(200).json({ message: "Event updated successfully!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteEvent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventId } = req.query;
    const eventExists = await checkEventExistsById(Number(eventId));
    if (!eventExists) {
      res.status(404).json({ message: "Event with this name doesn't exists!" });
      return;
    }

    const deleteEvent = await deleteEventService(Number(eventId));

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function register(
  req: Request<{}, {}, registerRequestBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { details, jwtPayload } = req.body;
    const user = await findUserByEmail(jwtPayload.email);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const qrToken = await generateQrCodeToken();
    const qrCode = await generateQRCode(qrToken);

    if (details.teamCode) {
      // Team event logic
      const existingTeam = await checkForTeam(details.teamCode);

      if (!existingTeam) {
        res.status(404).json({ message: "Invalid team code!" });
        return;
      }

      const alreadyJoined = await checkAlreadyJoinedTeam(
        details.teamCode,
        Number(user.id),
      );

      if (alreadyJoined) {
        res.status(409).json({ message: "You have already joined the team!" });
        return;
      }
    }

    // Register user for the event (team or individual)
    const newRegister = await registerForEvent(
      details,
      Number(user.id),
      qrToken,
    );


    if (newRegister) {

      const mail = await sendEmail(
        jwtPayload.email,
        newRegister.user,
        newRegister.event,
        qrCode as string,
      );

      if (newRegister.teamCode) {
        const teamMembers = await getTeamMembers(
          newRegister.teamCode,
          newRegister.eventId,
        );
        res.status(200).json({
          message: "Registered for team event successfully!",
          qrCode,
          teamMembers,
        });
        return;
      }

      res.status(200).json({
        message: "Registered for event successfully!",
        qrCode,
      });
      return;
    } else {
      res.status(400).json({ message: "Error registering for the event!" });
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function registerTeam(
  req: Request<{}, {}, registerRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const { details, jwtPayload } = req.body;
  const user = await findUserByEmail(jwtPayload.email);
  if (!user) {
    throw new Error("User not found.");
  }

  const teamCode = await generateTeamCode();
  details.teamCode = teamCode;

  const qrToken = await generateQrCodeToken();

  const qrCode = await generateQRCode(qrToken);

  const newTeamRegister = await registerTeamForEvent(
    details as { eventId: number; teamCode: string },
    Number(user.id),
    qrToken,
  );

  if (newTeamRegister) {
    const mail = await sendEmail(
      jwtPayload.email,
      newTeamRegister?.user,
      newTeamRegister?.event,
      qrCode as string,
    );
    const teamMembers = await getTeamMembers(details.teamCode, details.eventId);
    res.status(200).json({
      message: "Registered for event successfully!",
      teamCode,
      qrCode,
      teamMembers,
    });
    return;
  }
}

export async function upcomingEvents(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const events = await getUpcomingEvents();

    if (events) {
      res.status(200).json({ message: "Upcoming events", events });
      return;
    }
  } catch (error) {
    console.error("Error fetching upcoming events: ", error);
    next(error);
  }
}

export async function committeeEvents(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { committeeName } = req.body;
    const events = await getCommitteeEvents(committeeName);

    if (events) {
      res.status(200).json({ message: "Committee events fetched!", events });
      return;
    } else {
      res.status(404).json({ message: "No events by this committee!" });
    }
  } catch (error) {
    console.error("Error getting committee events:", error);
    next(error);
  }
}

export async function eventDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventName } = req.body;
    const details = await getEventDetailsByName(eventName);
    if (details) {
      const cId = details.committee?.id;
      const pubs = await getPubsInfo(Number(cId));
      res
        .status(200)
        .json({
          message: "Event details fetched",
          eventDetails: details,
          pubs,
        });
      return;
    }
    res.status(404).json({ message: "Event not found" });
  } catch (error) {
    console.error("Error getting event details:", error);
    next(error);
  }
}

export async function checkRegistered(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { details, jwtPayload } = req.body;

    const user = await findUserByEmail(jwtPayload.email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const data = await checkIfAlreadyRegistered(user.id, details.eventId);
    if (data) {
      const qrCode = await generateQRCode(data.qrCodeToken);
      if (data.teamCode) {
        const teamMembers = await getTeamMembers(
          data.teamCode,
          details.eventId,
        );
        res.status(200).json({
          status: true,
          details: data,
          qrCode,
          teamCode: data.teamCode,
          teamMembers,
        });
        return;
      }
      res.status(200).json({ status: true, details: data, qrCode });
      return;
    }

    res.status(200).json({ status: false });
  } catch (error) {
    next(error);
  }
}

export async function getAllEvents(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const events = await getEvents();
    res.status(200).json({ message: "All events", events });
  } catch (error) {
    next(error);
  }
}

interface Participant {
  user: any; // Temporarily set to any
  event: any; // Temporarily set to any
  academicInfo?: any; // Temporarily set to any
}

export async function getEventParticipants(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventId } = req.query;
    const eventExists = await checkEventExistsById(Number(eventId));
    if (!eventExists) {
      res.status(404).json({ message: "Event with this name doesn't exists!" });
      return;
    }

    const participants: Participant[] = await getEventParticipantService(
      Number(eventId),
    );

    //here, for each user in the participant array, get there email from participant.user and then use the findUserByEmail(email) service to get their details, in hte detail, there will be user.academicinfo object also for each user, add that academicInfo to the object of the participant in the particiapnt array
    const enhancedParticipants = await Promise.all(
      participants.map(async (participant) => {
        if (participant.user && participant.user.email) {
          const userDetails = await findUserByEmail(participant.user.email);
          if (userDetails && userDetails.academicInfo) {
            participant.academicInfo = userDetails.academicInfo;
          }
        }
        return participant;
      }),
    );

    if (participants) {
      res
        .status(200)
        .json({ message: "Participants", participants: enhancedParticipants });
      return;
    }
  } catch (error) {
    next(error);
  }
}
