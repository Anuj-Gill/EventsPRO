import React, { useState, useEffect } from "react";
import { getCommitteeInfo, updateCommitteeInfoApi } from "../api/committeeApi";
import CommitteeDetails from "../components/Committee/CommitteeDetails";
import { roleState } from "../store/atoms/RoleState";
import { useRecoilValue } from "recoil";

const CommitteeProfile: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = useRecoilValue(roleState);

  useEffect(() => {
    const fetchCommitteeInfo = async () => {
      try {
        const response = await getCommitteeInfo();
        setInfo(response.data.info);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch committee information");
        setLoading(false);
      }
    };

    fetchCommitteeInfo();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-white">
          <svg
            className="w-10 h-10 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 -mt-10 flex justify-center items-center min-h-screen">
      {info && <CommitteeDetails info={info} />}
    </div>
  );
};

export default CommitteeProfile;
