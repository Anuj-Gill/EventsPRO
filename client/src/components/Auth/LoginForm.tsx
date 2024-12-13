import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { academicInfo } from "../../store/atoms/acadInfo";
import { verificationStatus } from "../../store/atoms/verificationStatus";
import { loggedinStatusState } from "../../store/atoms/LoginStatus";
import { roleState } from "../../store/atoms/RoleState";
import { profilePicState } from "../../store/atoms/ProfilePicState";
import { feedBackState } from "../../store/atoms/feedBackState";
import { useNavigate } from "react-router-dom";
import Loading from "../Helpers/Loading";
import Toast from "../Helpers/Toast";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [acadInfo, setAcadInfo] = useRecoilState(academicInfo);
  const [verifyStatus, setVerifyStatus] = useRecoilState(verificationStatus);
  const [loggedinStatus, setLoggedinStatus] = useRecoilState(loggedinStatusState);
  const [role, setRole] = useRecoilState(roleState);
  const [profilePic, setProfilePic] = useRecoilState(profilePicState);
  const [feedBack, setFeedBack] = useRecoilState(feedBackState);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" }); // State for toast
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      setToast({ isVisible: true, message: "All fields are required.", type: "error" });
      return;
    }
    if (formData.password.length < 8) {
      setToast({ isVisible: true, message: "Password must be at least 8 characters long.", type: "error" });
      return;
    }

    setIsLoading(true); // Show loading screen
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, formData);
      setAcadInfo(response.data.academicInfo);
      setVerifyStatus(response.data.verificationStatus);
      localStorage.setItem("token", response.data.token);
      setLoggedinStatus(true);
      setRole(response.data.role);
      setProfilePic(response.data.profilePic);
      setFeedBack(response.data.feedBack ? true : false);

      // Show success toast
      setToast({ isVisible: true, message: "Login successful!", type: "success" });

      // Navigate based on academic info presence
      navigate(response.data.academicInfo ? "/dashboard" : "/academic_info");
    } catch (error: any) {
      console.error("Login error: ", error);
      const errorMessage = error.response?.data?.message || "An error occurred";

      // Show error toast
      setToast({ isVisible: true, message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false); // Hide loading screen
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading && <Loading text="Logging in..." />}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type} // Pass toast type for dynamic color
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <form className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
            minLength={8}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          Sign In
        </button>
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign up
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
