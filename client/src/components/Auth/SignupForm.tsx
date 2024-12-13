// components/SignupForm.tsx
import React from "react";
import { Lock, Mail, User } from "lucide-react";

interface SignupFormProps {
  isAdmin: boolean;
  formData: {
    fullName: string;
    email: string;
    password: string;
    adminCode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  isAdmin,
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            required
            type="text"
            placeholder="Full Name"
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="email"
            value={formData.email}
            onChange={onChange}
            required
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
            onChange={onChange}
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          />
        </div>

        {isAdmin && (
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              name="adminCode"
              value={formData.adminCode}
              onChange={onChange}
              type="text"
              placeholder="Admin Code"
              className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
            />
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        className="w-full px-6 py-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
