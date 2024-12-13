import React from 'react';

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...'
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin w-16 h-16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-50"
            cx="12"
            cy="12"
            r="10"
            stroke="#4F46E5"
            strokeWidth="2"
          />
          <path
            className="opacity-75"
            fill="#4F46E5"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && <span className="mt-6 text-white font-bold text-2xl">{text}</span>}
      </div>
    </div>
  );
};

export default Loading;
