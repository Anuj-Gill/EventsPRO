import { useState, useEffect } from "react";
import { getCommitteeEvents, getALlEvents } from "../api/eventApi"; // Add a new API function `getAllEvents`

export const useCommitteeEvent = (committeeName: string | null) => {
  const [events, setEvents] = useState<any[]>([]); // Ensure this matches your data structure
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    try {
      let response;

      // If `committeeName` is provided, fetch events for the specific committee
      if (committeeName) {
        response = await getCommitteeEvents(committeeName);
        console.log(response?.data?.events);
      } else {
        // If `committeeName` is null, fetch all events
        response = await getALlEvents();

        console.log(response?.data?.events);
      }

      if (response?.data?.events) {
        const normalizedEvents = response.data.events.map((event: any) => ({
          id: event.id,
          eventName: event.eventName,
          posterUrl: event.eventPoster || event.posterUrl, // Handle both cases
          date: event.dateTime ? new Date(event.dateTime).toLocaleDateString() : "",
          time: event.dateTime ? new Date(event.dateTime).toLocaleTimeString() : "",
          venue: event.venue || "Online",
          team: event.team,
          prize: event.prize || "No prize",
          committee: event.committee?.nickName || "General",
        }));

        setEvents(normalizedEvents);
      } else {
        setError("No events found");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [committeeName]); // Trigger the fetch whenever `committeeName` changes

  return { events, error, loading, fetchEvents };
};
