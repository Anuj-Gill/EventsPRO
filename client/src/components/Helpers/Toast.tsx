import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: string; // Add type for success or error
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, type = "success", onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const backgroundColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed bottom-4 right-4 ${backgroundColor} text-white px-6 py-3 z-50 rounded-md shadow-lg
        transform transition-transform duration-300 ease-in-out font-semibold text-lg
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      {message}
    </div>
  );
};

export default Toast;
