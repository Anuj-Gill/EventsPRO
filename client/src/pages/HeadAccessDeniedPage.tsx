import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeadAccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden -mt-10 ">


      {/* Main content */}
      <div className="relative z-10 text-center max-w-md w-full p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-6 text-red-500 animate-bounce"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M11 17a5 5 0 1 0 10 0 5 5 0 1 0 -10 0"></path>
            <path d="M11 17h-8v-12a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v2"></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
          </svg>
          <h1 className="text-4xl font-bold text-white dark:text-gray-200 mb-4">
            Access Restricted
          </h1>
          <p className="text-white dark:text-gray-400 text-lg mb-6">
            🚫 Oops! This page is restricted to Committee members only.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-4 py-2 border bg-purple-500 text-white hover:bg-purple-500 hover:text-white transition-colors rounded-lg flex items-center justify-center group"
          >
            Return to Dashboard
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
        </div>
      </div>
    </div>
  );
};

export default HeadAccessDeniedPage;
