import React from "react";
import { User, CheckCircle2 } from "lucide-react";
import { BackgroundGradient } from "../ui/background-gradient";

interface AttendanceContentProps {
  details: {
    user: {
      name: string;
      email: string;
    };
    event: {
      eventName: string;
      venue: string;
      dateTime: string;
    };
  };
  isPresent: boolean;
  onMarkPresent: () => void;
}

const AttendanceContent: React.FC<AttendanceContentProps> = ({
  details,
  isPresent,
  onMarkPresent,
}) => {
  return (
    <div className="flex justify-center items-center">
      <BackgroundGradient className="rounded-[22px] max-w-md p-8 sm:p-10 bg-gray-800 shadow-md border border-neutral-200 dark:border-zinc-700">
        {/* User Profile Section */}
        <div className="flex items-center mb-6">
          {/* User Icon */}
          <div className="bg-gray-800 rounded-full p-3 mr-4">
            <User className="text-blue-400" size={40} />
          </div>
          {/* User Details */}
          <div>
            <h2 className="text-xl font-bold text-blue-300 dark:text-blue-400">
              {details.user.name}
            </h2>
            <p className="text-gray-400 dark:text-gray-500">{details.user.email}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">
            {details.event.eventName}
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Venue:</strong> {details.event.venue}
            </p>
            <p>
              <strong>Date:</strong> {new Date(details.event.dateTime).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Attendance Status */}
        <div className="flex items-center justify-between mb-6">
          {/* Status Indicator */}
          <div className="flex items-center">
            {isPresent ? (
              <CheckCircle2 className="text-green-500 mr-2" size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full bg-yellow-500 mr-2" />
            )}
            <span
              className={`font-medium ${isPresent ? "text-green-400" : "text-yellow-400"}`}
            >
              {isPresent ? "Marked Present" : "Not Yet Marked"}
            </span>
          </div>
          {/* Mark Attendance Button */}
          {!isPresent && (
            <button
              onClick={onMarkPresent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Mark Attendance
            </button>
          )}
        </div>

        {/* Disclaimer for Marked Attendance */}
        {isPresent && (
          <p className="text-sm text-gray-500 text-center">
            ✨ You cannot change your attendance status after marking present.
          </p>
        )}
      </BackgroundGradient>
    </div>
  );
};

export default AttendanceContent;
