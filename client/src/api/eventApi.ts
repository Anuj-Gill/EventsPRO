import { details } from "framer-motion/client";
import axiosInstance from "./axiosInstance";
import { Delta } from "framer-motion";

interface EventDetails {
  eventName: string;
  dateTime: string;
  venue: string;
  about: string;
  isOnline: boolean;
  prize: string;
  entryFee: string;
  team: boolean;
}

export const createEvent = async (eventDetails: EventDetails) => {
  try {
    const response = await axiosInstance.post("/event/create", { eventDetails });
    return response
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export const updateEvent = async (eventDetails: EventDetails, eventId: number) => {
  try {
    const response = await axiosInstance.post("/event/update", { eventDetails, eventId });
    return response
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}


export const getUpcomingEvents = async () => {
  try {
    const response = await axiosInstance.get("/event/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getCommitteeEvents = async (committeeName: string) => {
  try {
    const response = await axiosInstance.post("/event/bycommittee", { committeeName });
    return response;
  } catch (error) {
    console.error("Error getting committee events:", error);
    throw error;
  }
}

export const getALlEvents = async () => {
  try {
    const response = await axiosInstance.get("/event/all");
    return response;
  } catch (error) {
    console.error("Error getting all events:", error);
    throw error;
  }
}


interface EventDetails {
  eventDetails?: any,
  message: string,
  pubs: any
}

export const getEventDetails = async (eventName: string) => {
  try {
    const response = await axiosInstance.post<EventDetails>("/event/details", { eventName });
    return response;
  } catch (error) {
    console.error("Error fetching event details", error);
    throw error;
  }
}
interface Details {
  eventId: number,
  teamCode?: string
}

export const registerForEvent = async (details: Details) => {
  try {
    const response = await axiosInstance.post("/event/register", { details });
    return response;
  } catch (error) {
    console.error("Error registering for event!", error);
    throw error;

  }
}

export const registerTeam = async (details: Details) => {
  try {
    const response = await axiosInstance.post("/event/registerTeam", { details });
    return response;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
}

export const checkRegistered = async (details: Details) => {
  try {
    const response = await axiosInstance.post("/event/check/registered", { details });
    return response;
  } catch (error) {
    console.error("Error checking if registered!", error);
    throw error;
  }
}


export const deleteEvent = async (eventId: number) => {
  try {
    const response = await axiosInstance.delete("/event/delete", {
      params: { eventId }
    });
    return response
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

export const getParticipants = async (eventId: number) => {
  try {
    const response = await axiosInstance.get("/event/participants", {
      params: { eventId }
    });
    return response
  } catch (error) {
    console.error("Error fetching event participants: ", error);
    throw error;
  }
}


