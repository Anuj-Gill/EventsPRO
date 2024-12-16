import React, { useEffect } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { FlipWords } from "../components/ui/flip-words";
import LoginForm from "../components/Auth/LoginForm";
import { loggedinStatusState } from "../store/atoms/LoginStatus";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const flipWords = ["smart", "secure", "efficient", "innovative"]; // Words to flip
  const loggedIn = useRecoilValue(loggedinStatusState);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col text-white md:-mt-20">
      <div className="flex flex-1 flex-col md:flex-row space-y-4 md:space-y-16">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex lg:-mt-16  flex-col justify-center px-6 md:px-10 py-10 md:py-0 space-y-6 text-center ">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome back!
          </h1>
          <p className="text-2xl md:text-4xl font-bold leading-tight">
            You've made the{" "}
            <FlipWords words={flipWords} className="text-purple-400" />choice.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
          <div className="max-w-sm w-full">
            <p className="text-white text-3xl md:text-4xl font-bold text-center mb-6">
              Sign in
            </p>
            <GoogleSignInButton />
            <div className="flex items-center justify-between my-6">
              <div className="w-full h-px bg-gray-700"></div>
              <span className="mx-4 text-gray-400">or</span>
              <div className="w-full h-px bg-gray-700"></div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
