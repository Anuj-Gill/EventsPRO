import React from "react";
import { CalendarDays, MapPin, Users, Trophy, Edit, Trash, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { extractEmbedCode } from "../../utils/ExtractEmbedCode";

interface EventProps {
  event: {
    id: string;
    eventName: string;
    posterUrl: string;
    committee: string;
    date: string;
    time: string;
    venue: string;
    team: boolean;
    prize?: string;
  };
  showActions?: boolean; // Prop to show edit/delete options
  onEdit?: (eventId: string) => void; // Callback for edit
  onDelete?: (eventId: string) => void; // Callback for delete
  onStats?: (eventId: string) => void; // Callback for delete
}

const EventCard: React.FC<EventProps> = ({ event, showActions = false, onEdit, onDelete, onStats }) => {
  const navigate = useNavigate();
  const imageUrl = extractEmbedCode(event.posterUrl);

  return (
    <div
      onClick={() => navigate(`/event/info?eventName=${event.eventName}`)}
      className="group relative h-[400px] w-full overflow-hidden rounded-2xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <iframe
          src={imageUrl}
          title={event.eventName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500">
        {/* Committee Badge */}
        <div className="mb-4 opacity-0 translate-y-4 transform transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-600/80 text-sm backdrop-blur-sm">
            {event.committee}
          </span>
        </div>

        {/* Event Name */}
        <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:-translate-y-2">
          {event.eventName}
        </h3>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4 text-white/80 text-sm opacity-0 translate-y-4 transform transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>
              {new Date(`${event.date} ${event.time}`).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.team ? "Team Event" : "Individual Event"}</span>
          </div>
          {event.prize && (
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>{event.prize}</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Delete Buttons */}
      {showActions && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onEdit?.(event.id);
            }}
            className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onDelete?.(event.id);
            }}
            className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
          >
            <Trash className="w-4 h-4" />
          </button>
          {/* Graph Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onStats?.(event.id);// Pass event ID to handle graph logic
            }}
            className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700"
          >
            <BarChart className="w-4 h-4" /> {/* Graph Icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
