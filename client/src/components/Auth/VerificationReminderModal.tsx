import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { verificationStatus } from '../../store/atoms/verificationStatus';
import { loggedinStatusState } from '../../store/atoms/LoginStatus';
import Loading from '../Helpers/Loading';
import Toast from '../Helpers/Toast';
import { useNavigate } from 'react-router-dom';

interface VerificationReminderProps {
  backendUrl?: string;
  onVerificationComplete?: () => void;
}

const VerificationReminderModal: React.FC<VerificationReminderProps> = ({
  backendUrl = import.meta.env.VITE_BACKEND_URL,
  onVerificationComplete
}) => {
  const [verifyStatus, setVerifyStatus] = useRecoilState(verificationStatus);
  const [, setLoggedInStatus] = useRecoilState(loggedinStatusState);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Check verification status on component mount
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/verify/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const isVerified = response.data.verificationStatus;
      setVerifyStatus(isVerified);

      if (isVerified && onVerificationComplete) {
        onVerificationComplete();
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      setToastMessage("Failed to check verification status");
      setShowToast(true);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/auth/resend`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setToastMessage("Verification email has been sent");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setToastMessage("Failed to send verification email");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Reset login status in global state
    setLoggedInStatus(false);

    // Navigate to login page
    navigate('/login');
  };

  // If verified, render nothing
  if (verifyStatus) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        />
        <div className="relative z-50 w-full max-w-lg">
          <CardSpotlight className="overflow-hidden">
            <div className="relative z-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Verify Your Email
                </h2>
                <div className="space-y-2">
                  <p className="text-neutral-300">
                    We've sent you a verification link
                  </p>
                  <p className="text-sm text-neutral-400">
                    Please check your inbox and click the verification link to activate your account.
                  </p>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all
                             bg-gradient-to-r from-purple-500/20 to-blue-500/20
                             hover:from-purple-500/30 hover:to-blue-500/30
                             text-white border border-white/10 hover:border-white/20
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend Verification Email
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all
                             bg-red-500/20 hover:bg-red-500/30
                             text-white border border-white/10 hover:border-white/20"
                  >
                    Logout
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  Didn't receive the email? Check your spam folder or try resending it.
                </p>
                <p className="text-lg text-neutral-400 pt-4">
                  If you clicked the verification link, please refresh this page to proceed!
                </p>
              </div>
            </div>
          </CardSpotlight>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Loading Indicator */}
      {isLoading && <Loading text="Sending email..." />}
    </>
  );
};

export default VerificationReminderModal;
