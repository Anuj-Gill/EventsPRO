import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCommitteeEvent } from "../hooks/useCommitteeEvents";
import EventCard from "../components/Event/EventCard";
import Loading from "../components/Helpers/Loading";
import VerificationReminderModal from "../components/Auth/VerificationReminderModal";
import { useRecoilState } from "recoil";
import { verificationStatus } from "../store/atoms/verificationStatus";
import axios from "axios";

const EventsPage: React.FC = () => {
  const [search] = useSearchParams();
  const committeeName = search.get("committee");
  const { events, error, loading } = useCommitteeEvent(committeeName || "");
  const [verifyStatus, setVerifyStatus] = useRecoilState(verificationStatus);

  useEffect(() => {
    async function checkVerificationStatus() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setVerifyStatus(response.data.verificationStatus);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    }

    checkVerificationStatus();
  }, [setVerifyStatus]);

  const handleVerificationComplete = () => {
    setVerifyStatus(true);
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
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
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

export default EventsPage;
