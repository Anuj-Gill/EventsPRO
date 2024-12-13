import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedinStatusState } from '../store/atoms/LoginStatus';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(loggedinStatusState);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md w-full p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-6 text-purple-500 animate-bounce"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <h1 className="text-4xl font-bold text-white dark:text-gray-200 mb-4">
            Oops! Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Hmmmmmn, trying to sneak in? 🕵️ Login or signup first, sneaky adventurer!
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors rounded-lg flex items-center justify-center group"
          >
            Login Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-lg"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
