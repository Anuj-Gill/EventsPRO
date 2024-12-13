import React from "react";
import {
  CalendarDays,
  MapPin,
  Info,
  Clock,
  Image,
  Coins,
  Users,
  Globe,
  Trophy,
} from "lucide-react";

interface EventFormProps {
  formData: {
    eventName: string;
    eventPoster: string;
    date: string;
    time: string;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: string;
    team: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string; // Button text for create or update actions
}

const EventForm: React.FC<EventFormProps> = ({
  formData,
  onChange,
  onSubmit,
  buttonText,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/10"
    >
      {/* Event Name */}
      <div className="relative">
        <Info className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="eventName"
          value={formData.eventName}
          onChange={onChange}
          type="text"
          placeholder="Event Name"
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          required
        />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="date"
            value={formData.date}
            onChange={onChange}
            type="date"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
            required
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="time"
            value={formData.time}
            onChange={onChange}
            type="time"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
            required
          />
        </div>
      </div>

      {/* Venue and Online Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="venue"
            value={formData.venue}
            onChange={onChange}
            type="text"
            placeholder="Venue"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
            required
          />
        </div>
        <div className="flex items-center space-x-3 px-4 py-4 bg-gray-900/80 border border-gray-800 rounded-xl">
          <Globe className="w-5 h-5 text-gray-400" />
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-gray-400">Online Event</span>
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={onChange}
              className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-800 bg-gray-900"
            />
          </label>
        </div>
      </div>

      {/* Event Poster */}
      <div className="relative">
        <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="eventPoster"
          value={formData.eventPoster}
          onChange={onChange}
          type="text"
          placeholder="Event Poster Link (Google Drive)"
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
        />
      </div>

      {/* Prize and Entry Fee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Trophy className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="prize"
            value={formData.prize}
            onChange={onChange}
            type="text"
            placeholder="Prize (optional)"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Coins className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="entryFee"
            value={formData.entryFee}
            onChange={onChange}
            type="number"
            step="0.01"
            placeholder="Entry Fee (optional)"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          />
        </div>
      </div>

      {/* Team Toggle */}
      <div className="flex items-center space-x-3 px-4 py-4 bg-gray-900/80 border border-gray-800 rounded-xl">
        <Users className="w-5 h-5 text-gray-400" />
        <label className="flex items-center cursor-pointer">
          <span className="mr-3 text-gray-400">Team Event</span>
          <input
            type="checkbox"
            name="team"
            checked={formData.team}
            onChange={onChange}
            className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-800 bg-gray-900"
          />
        </label>
      </div>

      {/* About Event */}
      <div className="relative">
        <Info className="absolute left-4 top-6 w-5 h-5 text-gray-400" />
        <textarea
          name="about"
          value={formData.about}
          onChange={onChange}
          placeholder="About the event"
          rows={4}
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default EventForm;
