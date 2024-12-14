import React, { useState, useEffect } from 'react';
import { BackgroundLines } from "../ui/background-lines";
import { feedBackState } from '../../store/atoms/feedBackState';
import { useRecoilState } from 'recoil';
import { X } from 'lucide-react';
import { addFeedbackApi } from '../../api/userApi';
import Toast from "../Helpers/Toast";

interface EventRegistrationSuccessProps {
  qrCodeBase64: string;
  eventName: string;
  onDashboardClick: () => void;
  teamCode?: string;
  teamMembers?: string[]
}

const FeedbackModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (feedback: { rating: number, comment: string }) => void
}> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const ratingIcons = [
    { emoji: '😭', label: 'Very Unhappy' },
    { emoji: '😞', label: 'Unhappy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '😄', label: 'Very Happy' }
  ];

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ rating, comment });
      // Reset form
      setRating(0);
      setComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div
        className="relative md:w-full w-11/12 max-w-md p-6 rounded-xl  
        bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-blue-900/80 
        border border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          How was your experience?
        </h2>

        {/* Rating Section */}
        <div className="flex justify-center md:space-x-2 space-x-1  mb-6">
          {ratingIcons.map((item, index) => (
            <button
              key={index}
              onClick={() => setRating(index + 1)}
              className={`
                md:text-5xl text-4xl p-2 rounded-full transition-all duration-200 ease-in-out
                ${rating === index + 1
                  ? 'bg-white/20 scale-110 ring-2 ring-white/30'
                  : 'hover:bg-white/10'}
              `}
              aria-label={item.label}
            >
              <span className={`
                inline-block transition-transform
                ${rating === index + 1 ? 'scale-125' : ''}
              `}>
                {item.emoji}
              </span>
            </button>
          ))}
        </div>

        {/* Comment Section */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share more details (optional)"
          className="w-full p-3 rounded-lg bg-white/10 text-white 
          placeholder-white/50 border border-white/20 focus:outline-none 
          focus:ring-2 focus:ring-white/30 min-h-[100px]"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full mt-4 p-3 rounded-lg 
          bg-white/20 text-white font-bold 
          hover:bg-white/30 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

const EventRegistrationSuccess: React.FC<EventRegistrationSuccessProps> = ({
  qrCodeBase64,
  eventName,
  onDashboardClick,
  teamCode,
  teamMembers
}) => {
  const [feedBack, setFeedBack] = useRecoilState(feedBackState);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success"
  });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    // Show feedback modal after 3-4 seconds if feedback hasn't been given
    if (!feedBack) {
      const timer = setTimeout(() => {
        console.log("setting modal open");
        setIsFeedbackModalOpen(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [feedBack]);

  const handleFeedbackSubmit = async ({ rating, comment }) => {
    try {
      // Validate input
      if (rating === 0) {
        setToast({
          isVisible: true,
          message: "Please select a rating",
          type: "error"
        });
        return;
      }

      const response = await addFeedbackApi({ rating, comment });

      if (response?.data?.feedback) {
        setToast({
          isVisible: true,
          message: "Thanks for the feedback!",
          type: "success"
        });

        // Update feedback state to prevent repeated modal display
        setFeedBack(response?.data?.feedback?.status);

        // Close the modal
        setIsFeedbackModalOpen(false);
      } else {
        // Handle unexpected response
        setToast({
          isVisible: true,
          message: "Failed to submit feedback. Please try again.",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setToast({
        isVisible: true,
        message: "An error occurred while submitting feedback",
        type: "error"
      });
    }
  };

  const hasTeamDetails = !!teamCode;

  return (
    <>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <BackgroundLines
        svgOptions={{
          mobileStrokeWidth: 20,
          desktopStrokeWidth: 5,
          duration: 10
        }}
        className="min-h-screen flex items-center justify-center px-4 -mt-4"
      >
        <div className="max-w-5xl w-full mx-auto p-4 relative z-20">
          {hasTeamDetails ? (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Individual/Event Details Column */}
              <div className="text-center md:text-left space-y-6">
                <h1 className="relative z-20 text-4xl md:text-6xl text-white font-bold mb-4">
                  You're In! 🎉
                </h1>
                <div className=" rounded-2xl p-6 inline-block">
                  <img
                    src={`${qrCodeBase64}`}
                    alt="Event Entry QR Code"
                    className="w-64 h-64 mx-auto rounded-xl shadow-lg"
                  />
                  <div className="mt-4 space-y-4">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {eventName} Registration Confirmed
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto md:mx-0 text-base">
                      Congratulations! Your spot is secured. We've sent a detailed ticket
                      and event information to your registered email address.
                    </p>
                    <p className="text-white/60 text-sm">
                      You can always return to this page to view your entry QR code.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onDashboardClick}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Details Column */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Team Details
                </h3>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70 font-medium">Team Code:</span>
                    <span className="text-white font-bold">{teamCode}</span>
                  </div>
                  {teamMembers && teamMembers.length > 0 && (
                    <div className="border-t border-white/10 pt-2">
                      <h4 className="text-white/70 mb-2">Team Members:</h4>
                      <ul className="space-y-1">
                        {teamMembers.map((member, index) => (
                          <li
                            key={index}
                            className="text-white/80 flex items-center space-x-2"
                          >
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span>{member}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(!teamMembers || teamMembers.length === 0) && (
                    <div className="border-t border-white/10 pt-2">
                      <p className="text-white/60 italic text-sm">
                        Invite team members to join using this team code
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h1 className="relative z-20 text-4xl md:text-6xl text-white font-bold mb-4">
                You're In! 🎉
              </h1>
              <div className=" rounded-2xl p-6 inline-block">
                <img
                  src={`${qrCodeBase64}`}
                  alt="Event Entry QR Code"
                  className="w-64 h-64 mx-auto rounded-xl shadow-lg"
                />
                <div className="mt-4 space-y-4">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {eventName} Registration Confirmed
                  </h2>
                  <p className="text-white/80 max-w-xl mx-auto text-base">
                    Congratulations! Your spot is secured. We've sent a detailed ticket
                    and event information to your registered email address.
                  </p>
                  <p className="text-white/60 text-sm">
                    You can always return to this page to view your entry QR code.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onDashboardClick}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </BackgroundLines>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
};

export default EventRegistrationSuccess;
