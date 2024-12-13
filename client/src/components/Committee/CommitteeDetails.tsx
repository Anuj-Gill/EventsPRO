import React, { useState } from "react";
import { updateCommitteeInfoApi } from "../../api/committeeApi"; // Assume this API method exists
import { useRecoilValue } from "recoil";
import { roleState } from "../../store/atoms/RoleState";

// Custom Card Component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

// Committee Details Component
const CommitteeDetails: React.FC<{ info: any }> = ({ info }) => {
  const role = useRecoilValue(roleState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    committeeName: info.committeeName,
    description: info.description,
    committeeLogo: info.committeeLogo,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(info.committeeLogo);
  const [uploadedFileDetails, setUploadedFileDetails] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        setEditedInfo((prev) => ({
          ...prev,
          committeeLogo: base64,
        }));
        // Save file details
        setUploadedFileDetails({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCommittee = async () => {
    try {
      await updateCommitteeInfoApi(editedInfo);
      setUpdateMessage("Committee details updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update committee details", error);
      setUpdateMessage("Failed to update committee details");
    }
  };

  const isHeadRole = role.includes("Head");

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Committee Logo Upload/Display */}
        <div className="relative w-full flex items-center justify-center">
          {isEditing && isHeadRole ? (
            <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-800 rounded-md relative">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center text-gray-400 text-3xl font-bold">
                +
              </div>
              {uploadedFileDetails && (
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gray-900 text-gray-300 text-sm rounded-b-md">
                  <p>File: {uploadedFileDetails.name}</p>
                  <p>Size: {uploadedFileDetails.size}</p>
                  <p>Type: {uploadedFileDetails.type}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt={`${editedInfo.committeeName} Logo`}
                  className="w-32 h-32 object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-full text-gray-400">
                  No Logo
                </div>
              )}
            </div>
          )}
        </div>

        {/* Committee Information */}
        <div className="text-center space-y-2 w-full">
          {isEditing && isHeadRole ? (
            <>
              <input
                type="text"
                name="committeeName"
                value={editedInfo.committeeName}
                onChange={handleInputChange}
                className="w-full text-center text-2xl font-bold text-white bg-gray-800 p-2 rounded mb-2"
                placeholder="Committee Name"
              />
              <textarea
                name="description"
                value={editedInfo.description}
                onChange={handleInputChange}
                className="w-full text-gray-300 text-sm leading-relaxed px-4 bg-gray-800 p-2 rounded"
                placeholder="Committee Description"
                rows={4}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {editedInfo.committeeName}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed px-4">
                {editedInfo.description}
              </p>
            </>
          )}
        </div>

        {/* Update Controls for Head Role */}
        {isHeadRole && (
          <div className="w-full mt-4 space-y-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit Committee Details
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleUpdateCommittee}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedInfo(info);
                    setLogoPreview(info.committeeLogo);
                    setUploadedFileDetails(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Update Message */}
        {updateMessage && (
          <div
            className={`w-full text-center p-2 rounded mt-2 ${updateMessage.includes("successfully")
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
              }`}
          >
            {updateMessage}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommitteeDetails;
