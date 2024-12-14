import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import GoogleSignInButton from "../components/GoogleSignInButton";
import SignupForm from "../components/Auth/SignupForm";
import { academicInfo } from "../store/atoms/acadInfo";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { motion } from "framer-motion";
import Loading from "../components/Helpers/Loading";
import Toast from "../components/Helpers/Toast";
import { loggedinStatusState } from "../store/atoms/LoginStatus";
import { useRecoilValue } from "recoil";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", adminCode: "" });
  const [acadInfo, setAcadInfo] = useRecoilState(academicInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const loggedIn = useRecoilValue(loggedinStatusState);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validation Logic
    if (!formData.fullName || !formData.email || !formData.password || (isAdmin && !formData.adminCode)) {
      setToast({
        message: "Please fill in all required fields.",
        isVisible: true,
        type: "error",
      });
      return;
    }

    if (formData.password.length < 8) {
      setToast({
        message: "Password must be at least 8 characters long.",
        isVisible: true,
        type: "error",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      setToast({
        message: "Please enter a valid email address.",
        isVisible: true,
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setToast({ ...toast, isVisible: false }); // Hide previous toast if any

    try {
      const response = await axios.post(`${backendUrl}/auth/signup`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        code: isAdmin ? formData.adminCode.trim() : "",
      });

      setAcadInfo(response.data.academicInfo);

      // Success Toast
      setToast({
        message: "Signup successful! Redirecting to login...",
        isVisible: true,
        type: "success",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";

      // Error Toast
      setToast({
        message: errorMessage,
        isVisible: true,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isLoading && <Loading text="Signing you up..." />}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        type={toast.type} // Pass error state to Toast
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Section with Highlight */}
        <div className="flex-1 flex items-center justify-center px-12 -mt-20">
          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-xl px-4 md:text-2xl lg:text-4xl font-bold text-white dark:text-white max-w-2xl leading-relaxed lg:leading-snug text-center"
            >
              Join EventsPRO, whether you're organizing or participating.{" "}
              <Highlight className="text-black dark:text-white">
                Plan, stay updated, and elevate
              </Highlight>
              {" "}your events with ease!
            </motion.h1>
          </HeroHighlight>
        </div>

        {/* Right Section with Signup Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold">Create your account</h1>
            </div>

            <div className="space-y-6">
              <GoogleSignInButton />

              {/* OR Divider */}
              <div className="flex items-center space-x-4 my-4">
                <div className="flex-grow h-px bg-gray-700"></div>
                <span className="text-gray-400 text-sm uppercase">Or</span>
                <div className="flex-grow h-px bg-gray-700"></div>
              </div>

              <div className="relative flex items-center justify-between">
                <span className="text-gray-400">Register as Admin</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-purple-500 peer-checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <SignupForm
                isAdmin={isAdmin}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSignup}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
