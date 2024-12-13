import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkEventExists(eventName: string) {
  return await prisma.event.findFirst({
    where: {
      eventName,
    },
  });
}

export async function checkEventExistsById(eventId: number) {
  return await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });
}

export async function createNewEvent(
  eventDetails: {
    eventName: string;
    eventPoster: string;
    dateTime: Date;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: number;
    team: boolean;
  },
  committeeId: number,
) {
  return await prisma.event.create({
    data: {
      eventName: eventDetails.eventName,
      eventPoster: eventDetails.eventPoster,
      dateTime: eventDetails.dateTime,
      venue: eventDetails.venue,
      about: eventDetails.about,
      isOnline: eventDetails.isOnline,
      prize: eventDetails.prize,
      entryFee: eventDetails.entryFee,
      team: eventDetails.team,
      committeeId,
    },
  });
}

export async function updateEventService(
  eventId: number, // Identifier for the event to be updated
  eventDetails: {
    eventName?: string;
    eventPoster?: string;
    dateTime?: Date;
    venue?: string;
    about?: string;
    isOnline?: boolean;
    prize?: string;
    entryFee?: number;
    team?: boolean;
  },
) {
  // Filter eventDetails to ensure only updatable fields are passed
  const allowedFields = {
    eventName: eventDetails.eventName,
    eventPoster: eventDetails.eventPoster,
    dateTime: eventDetails.dateTime,
    venue: eventDetails.venue,
    about: eventDetails.about,
    isOnline: eventDetails.isOnline,
    prize: eventDetails.prize,
    entryFee: eventDetails.entryFee,
    team: eventDetails.team,
  };

  // Remove undefined values to avoid overwriting existing fields in the database
  const sanitizedData = Object.fromEntries(
    Object.entries(allowedFields).filter(([_, value]) => value !== undefined),
  );

  return await prisma.event.update({
    where: {
      id: eventId, // Specify the event ID to update
    },
    data: sanitizedData, // Pass only the sanitized fields
  });
}

export async function checkForTeam(teamCode: string) {
  return await prisma.participant.findFirst({
    where: {
      teamCode,
    },
  });
}

export async function checkAlreadyJoinedTeam(teamCode: string, userId: number) {
  return await prisma.participant.findFirst({
    where: {
      teamCode,
      userId,
    },
  });
}

export async function checkIfAlreadyRegistered(
  userId: number,
  eventId: number,
) {
  console.log(userId, eventId);
  return await prisma.participant.findFirst({
    where: {
      userId,
      eventId,
    },
  });
}

export async function registerForEvent(
  details: { eventId: number; teamCode?: string },
  userId: number,
  qrCodeToken: string,
) {
  if (!details.eventId || !userId) {
    return false;
  }


  // If teamCode is provided, validate it
  if (details.teamCode) {
    const newParticipant = await prisma.participant.create({
      data: {
        userId,
        eventId: details.eventId,
        registrationDate: new Date(),
        qrCodeToken,
        ...(details.teamCode && { teamCode: details.teamCode }),
      },
      include: {
        event: true,
        user: true,
      },
    });


    return newParticipant;
  } else {
    // Logic for individual events
    const newParticipant = await prisma.participant.create({
      data: {
        userId,
        eventId: details.eventId,
        registrationDate: new Date(),
        qrCodeToken,
      },
      include: {
        event: true,
        user: true,
      },
    });

    return newParticipant;
  }
}

export async function registerTeamForEvent(
  details: { eventId: number; teamCode: string },
  userId: number,
  qrCodeToken: string,
) {
  if (!details.eventId || !userId) {
    throw new Error("Event ID and User ID are required");
  }

  return await prisma.participant.create({
    data: {
      userId,
      eventId: details.eventId,
      registrationDate: new Date(),
      qrCodeToken,
      teamCode: details.teamCode,
    },
    include: {
      event: true,
      user: true,
    },
  });
}

export async function getEventId(qrCodeToken: string) {
  return prisma.participant.findFirst({
    where: {
      qrCodeToken,
    },
    include: {
      event: true,
      user: true,
    },
  });
}

export async function getUpcomingEvents() {
  // Get current date and calculate the date 30 days from now
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 30); // 30 days later

  try {
    return await prisma.event.findMany({
      where: {
        dateTime: {
          gte: currentDate, // Greater than or equal to current date
          lt: endDate, // Less than 30 days from now
        },
      },
      include: {
        committee: true,
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function getCommitteeEvents(committeeName: string) {
  const committee = await prisma.committee.findFirst({
    where: {
      committeeName,
    },
  });

  const cId = committee?.id;


  if (cId) {
    return await prisma.event.findMany({
      where: {
        committeeId: cId,
      },
      include: {
        committee: true,
      },
    });
  } else {
    return false;
  }
}

export async function getEventDetailsByName(eventName: string) {
  return await prisma.event.findFirst({
    where: {
      eventName,
    },
    include: {
      committee: true,
    },
  });
}

export async function getTeamMembers(teamCode: string, eventId: number) {
  return await prisma.participant.findMany({
    where: {
      teamCode,
      eventId,
    },
    include: {
      user: true,
    },
  });
}

export async function getEvents() {
  return await prisma.event.findMany({
    include: {
      committee: true,
    },
  });
}

export async function deleteEventService(eventId: number) {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
}

export async function getEventParticipantService(eventId: number) {
  return await prisma.participant.findMany({
    where: {
      eventId,
    },
    include: {
      user: true,
      event: true,
    },
  });
}
