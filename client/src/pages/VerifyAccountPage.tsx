import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BackgroundBeams } from "../components/ui/background-beams";

const VerifyAccountPage: React.FC = () => {
  const location = useLocation();
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const verifyAccount = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        await new Promise(resolve => setTimeout(resolve, 4000));
        setStatus("Verification token is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const [response] = await Promise.all([
          axios.get(`${backendUrl}/auth/verify`, {
            params: { token },
          }),
          new Promise(resolve => setTimeout(resolve, 4000))
        ]);

        if (response.status === 200) {
          setStatus(response.data.message || "Account verified successfully!");
          setIsSuccess(true);
        } else {
          setStatus(response.data.message || "Verification failed.");
        }
      } catch (error: any) {
        console.error("Error verifying account:", error);
        setStatus(
          error.response?.data?.message ||
          "An error occurred during verification. Please try again later."
        );
      }
      setIsLoading(false);
    };
    verifyAccount();
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] w-full relative flex flex-col items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
              Account Verification
            </h1>
            <div className="w-12 h-12 border-4 border-t-blue-400 border-white/20 rounded-full animate-spin mx-auto" />
            <p className="text-lg text-white/80">
              Verifying your account, please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[80vh] w-full relative flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="transition-all duration-500 ease-in-out scale-100 opacity-100">
          <h1 className="relative z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 font-bold mb-8">
            Account Verification
          </h1>

          {isSuccess ? (
            <div className="space-y-6 relative z-10">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-neutral-200 text-xl font-medium">
                {status}
              </p>
              <p className="text-neutral-400 max-w-lg mx-auto text-base">
                You can now return to the login page and sign in with your credentials.
              </p>
            </div>
          ) : (
            <div className="relative z-10 space-y-4">
              <p className="text-red-400 text-xl font-medium">{status}</p>
              <p className="text-neutral-400">Please try again or contact support if the issue persists.</p>
            </div>
          )}
        </div>
      </div>

      {/* Show BackgroundBeams for both success and error states */}
      <BackgroundBeams />
    </div>
  );
};

export default VerifyAccountPage;
