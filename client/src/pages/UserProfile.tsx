import React, { useState, useEffect, useRef } from "react";
import { userDataApi, userDataUpdateApi } from "../api/userApi";
import { User, Camera } from "lucide-react";
import { profilePicState } from "../store/atoms/ProfilePicState";
import { useRecoilState } from "recoil";
import Toast from "../components/Helpers/Toast";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
  const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);
  const [profilePic, setProfilePic] = useRecoilState(profilePicState);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" }); // State for toast


  const fetchData = async () => {
    try {
      const response = await userDataApi();
      setUserData(response.data.user);
      setFormData(response.data.user); // Initialize form data with user data

      setProfilePic(response.data.user.profilePic);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setIsDirty(true);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await userDataUpdateApi(formData); // Replace this with your API function
      setUserData(response.data.user);
      setIsDirty(false);

      setProfilePic(response.data.user.profilePic);
      setToast({ isVisible: true, message: "Profile updated!", type: "success" });
    } catch (error: any) {
      console.error("Error updating user info:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setToast({ isVisible: true, message: errorMessage, type: "error" });
    }
    setUpdating(false);
  };


  const handleProfilePicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        // Check base64 string size before updating form data
        const fileSizeInKb = getEstimatedFileSizeFromBase64(base64String);
        console.log(fileSizeInKb);
        if (fileSizeInKb > 3000) { // Check for 5MB limit
          setToast({ isVisible: true, message: "Image exceeds 3MB limit!", type: "error" });
        } else {
          // Update form data with base64 image if size is acceptable
          handleInputChange('profilePic', base64String);
          setIsDirty(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to estimate base64 string size (improved accuracy)
  function getEstimatedFileSizeFromBase64(base64String: string) {
    const stringLength = base64String.length;
    const sizeInBytes = Math.ceil(stringLength / 3) * 4 * 0.75; // Adjusted factor for Base64 overhead
    const fileSizeInKb = sizeInBytes / 1024;
    return fileSizeInKb;
  }



  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGradientPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setGradientPosition({ x: 50, y: 50 });
  };

  useEffect(() => {
    fetchData();
  }, [updating]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pt-20 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type} // Pass toast type for dynamic color
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <div
        className="relative z-10 container mx-auto px-4 pb-12 flex flex-col items-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Profile Picture */}
        <div
          className="relative -mb-20 z-20"
          onMouseEnter={() => setIsHoveringProfilePic(true)}
          onMouseLeave={() => setIsHoveringProfilePic(false)}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicUpload}
            accept="image/*"
            className="hidden"
          />
          <div
            className="w-36 h-36 bg-gray-800 rounded-full border-4 border-purple-600/50 shadow-lg overflow-hidden relative group cursor-pointer"
            onClick={triggerFileInput}
          >
            {formData?.profilePic ? (
              <img
                src={formData.profilePic}
                alt={`${formData.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-500" />
              </div>
            )}

            {isHoveringProfilePic && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Camera className="w-10 h-10 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Main Info and Acad Info Sections */}
        <div
          ref={cardRef}
          className="relative flex flex-col z-15 md:flex-row items-stretch justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl border border-transparent mt-10 w-full max-w-4xl"
          style={{
            background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, 
              rgba(124, 58, 237, 0.3) 0%, 
              rgba(0,0,0,0) 60%)`,
            boxShadow: `0 0 20px 0px rgba(124, 58, 237, 0.3)`
          }}
        >
          <div className="absolute inset-0 rounded-xl border border-purple-600/30 pointer-events-none"></div>

          {/* Main Info */}
          <div className="flex-1 p-10 border-r border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Main Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-500 mb-1">Name:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Gender:</label>
                <select
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="flex-1 p-10">
            <h2 className="text-3xl font-bold mb-6">Acad Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-500 mb-1">Roll No:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.academicInfo?.rollNo || ""}
                  onChange={(e) =>
                    handleInputChange("academicInfo", {
                      ...formData.academicInfo,
                      rollNo: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Department:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.academicInfo?.department || ""}
                  onChange={(e) =>
                    handleInputChange("academicInfo", {
                      ...formData.academicInfo,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Year:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.academicInfo?.year || ""}
                  onChange={(e) =>
                    handleInputChange("academicInfo", {
                      ...formData.academicInfo,
                      year: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Division:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  value={formData?.academicInfo?.division || ""}
                  onChange={(e) =>
                    handleInputChange("academicInfo", {
                      ...formData.academicInfo,
                      division: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Update Info Button */}
        <div className="mt-8">
          <button
            className={`px-6 py-3 rounded bg-purple-600 text-white font-bold ${isDirty ? "hover:bg-purple-700" : "opacity-50 cursor-not-allowed"
              }`}
            onClick={handleUpdate}
            disabled={!isDirty || updating}
          >
            {updating ? "Updating..." : "Update Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
