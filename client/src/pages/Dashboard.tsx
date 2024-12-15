import React, { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect.tsx";
import VerificationReminderModal from "../components/Auth/VerificationReminderModal";
import { verificationStatus } from "../store/atoms/verificationStatus";
import { roleState } from "../store/atoms/RoleState";
import { loggedinStatusState } from "../store/atoms/LoginStatus";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { getUpcomingEvents } from "../api/eventApi";
import axios from "axios";
import {
  IconCalendarEvent,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import Loading from "../components/Helpers/Loading";

const Dashboard: React.FC = () => {
  const [verifyStatus, setVerifyStatus] = useRecoilState(verificationStatus);
  const [role, setRole] = useRecoilState(roleState);
  const loggedIn = useRecoilValue(loggedinStatusState);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setVerifyStatus(response.data.verificationStatus);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    }

    async function fetchUpcomingEvents() {
      try {
        const response = await getUpcomingEvents();
        setEvents(response.events);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
    fetchUpcomingEvents();
  }, []);

  const handleVerificationComplete = () => {
    setVerifyStatus(true);
  };

  if (loading) {
    return <Loading text="Fetching upcoming events.." />;
  }

  return (
    <div className="relative px-4 py-10">
      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between md:w-full items-start mt-2 md:w-full items-center md:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-white mb-4 sm:mb-0 sm:w-full">
          Upcoming Events
        </h1>

        {/* Horizontally Scrollable Button Container */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-2 min-w-max sm:justify-end">
            <button
              onClick={() => navigate("/user/stats")}
              className="flex-shrink-0 relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex hover:bg-gray-900 transition-smooth h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-6 py-1 text-sm sm:text-md font-medium text-white backdrop-blur-3xl">
                User Stats
              </span>
            </button>

            <button
              onClick={() => navigate("/committees")}
              className="flex-shrink-0 px-3 sm:px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all flex items-center gap-2"
            >
              <IconUsers className="w-4 h-4" />
              Committees
            </button>

            {(role?.includes("Head") || role?.includes("Member")) && (
              <button
                onClick={() => navigate("/committeedashboard")}
                className="flex-shrink-0 px-3 sm:px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg backdrop-blur-sm border border-blue-500/20 transition-all flex items-center gap-2"
              >
                <IconSettings className="w-4 h-4" />
                Manage Committee
              </button>
            )}

            <button
              onClick={() => navigate("/events")}
              className="flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
            >
              <IconCalendarEvent className="w-4 h-4" />
              View all events
            </button>
          </div>
        </div>
      </div>

      {/* Card Hover Effect Section */}
      <div className="relative max-w-4xl z-10 mb-10">
        <HoverEffect
          items={events.map((event: any) => ({
            id: event.id,
            title: event.eventName,
            description: event.about,
            link: event.eventPoster,
            committeeName: event.committee.committeeName
          }))}
        />
      </div>

      {/* Verification Reminder Modal */}
      {!verifyStatus && (
        <VerificationReminderModal
          onVerificationComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
};

export default Dashboard;
