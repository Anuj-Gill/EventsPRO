import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCommitteeEvent } from "../hooks/useCommitteeEvents";
import EventCard from "../components/Event/EventCard"; // Import EventCard properly
import Loading from "../components/Helpers/Loading"; // Use the Loading component
import { deleteEvent } from "../api/eventApi.ts";

const CommitteeEvents: React.FC = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const committeeName = search.get("committee");
  const { events, error, loading, fetchEvents } = useCommitteeEvent(committeeName || "");

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  if (loading) {
    return <Loading text="Fetching events..." />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative min-h-screen px-4 py-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          All Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <EventCard
              key={event.id}
              event={event}
              showActions={true}
              onEdit={() => navigate(`/committee/event/update?name=${event.eventName}`)}
              onDelete={() => handleDelete(event.id)}
              onStats={() => navigate(`/event/stats?id=${event.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteeEvents;
