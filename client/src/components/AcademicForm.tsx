import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Helpers/Loading";
import Toast from "../components/Helpers/Toast";

interface AcademicFormData {
  rollNumber: string;
  department: string;
  year: number;
  division: string;
}

const AcademicForm: React.FC = () => {
  const [formData, setFormData] = useState<AcademicFormData>({
    rollNumber: "",
    department: "",
    year: 1,
    division: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "year") {
      setFormData({ ...formData, [name]: Number(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rollNumber || !formData.department) {
      setToast({ message: "Roll Number and Department are required.", isVisible: true, type: "error" });
      return;
    }

    setIsLoading(true); // Show loading spinner
    setToast({ ...toast, isVisible: false }); // Hide previous toast if any

    try {
      const response = await axios.post(
        `${backendUrl}/user/acadInfo`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 201) {
        setToast({ message: "Academic Info submitted successfully!", isVisible: true, type: "success" });
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to submit academic info. Please try again.";
      setToast({ message: errorMessage, isVisible: true, type: "error" });
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isLoading && <Loading text="Submitting academic info..." />}
      <Toast message={toast.message} isVisible={toast.isVisible} type={toast.type} onClose={() => setToast({ ...toast, isVisible: false })} />

      {/* Roll No./Employee No. */}
      <div className="relative">
        <input
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          type="text"
          placeholder="Roll No. / Employee No."
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          required
        />
      </div>

      {/* Department */}
      <div className="relative">
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          type="text"
          placeholder="Department"
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
          required
        />
      </div>

      {/* Year */}
      <div className="relative">
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      {/* Division */}
      <div className="relative">
        <input
          name="division"
          value={formData.division}
          onChange={handleChange}
          type="text"
          placeholder="Division"
          className="w-full px-12 py-4 bg-gray-900/80 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
      >
        Submit Academic Info
      </button>
    </form>
  );
};

export default AcademicForm;
