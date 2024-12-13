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
    // Optional: Perform any additional actions when verification is complete
    setVerifyStatus(true);
  };

  if (loading) {
    return <Loading text="Fetching upcoming events.." />;
  }

  return (
    <div className="relative px-4 py-10">
      {/* Header Section */}
      <div className="relative z-10 flex justify-between items-center mt-2 px-6">
        <h1 className="text-4xl font-bold bg-clip-text text-white">
          Upcoming Events
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/committees")}
            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg backdrop-blur-sm border border-purple-500/20 transition-all flex items-center gap-2"
          >
            <IconUsers className="w-4 h-4" />
            Committees
          </button>
          {(role?.includes("Head") || role?.includes("Member")) && (
            <button
              onClick={() => navigate("/committeedashboard")}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg backdrop-blur-sm border border-blue-500/20 transition-all flex items-center gap-2"
            >
              <IconSettings className="w-4 h-4" />
              Manage Committee
            </button>
          )}
          <button
            onClick={() => navigate("/events")}
            className="text-sm px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
          >
            <IconCalendarEvent className="w-4 h-4" />
            View all events
          </button>
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
