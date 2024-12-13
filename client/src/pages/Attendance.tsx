import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getStudentDetails, markStudentPresent } from "../api/qrcode";
import { User, ShieldAlert, CheckCircle2 } from "lucide-react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import Loading from "../components/Helpers/Loading";
import AttendanceContent from "../components/Event//AttendanceContent";

const Attendance: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getStudentDetails(token as string);

        if (response.data.data.user) {
          setDetails(response.data.data);
          setIsPresent(response.data.data.attendance);
          setError(null);
        } else {
          setError(response.data.message || "Access denied!");
        }
      } catch (error) {
        console.error("Error fetching student details via QR: ", error);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [token]);

  const handleMarkPresent = async () => {
    try {
      setIsLoading(true);
      const response = await markStudentPresent(token as string);
      if (response.status == 200) {
        setIsPresent(true);
      }
    } catch (error) {
      console.error("Error marking attendance: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading text="Fetching Attendance Details" />;
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex -mt-20 items-center justify-center relative overflow-hidden">
        {/* Access Denied Card */}
        <div className="relative z-10 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 pt-0 max-w-md text-center">
          <ShieldAlert className="mx-auto mb-6 text-red-500" size={80} />
          <h2 className="text-2xl font-bold mb-4 text-red-400">Access Denied</h2>
          <p className="text-sm text-gray-500">
            Please contact the event organizers if you believe this is a mistake.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden pt-10">

      {/* Attendance Card */}
      <div className="relative z-10 container mx-auto px-4">
        <AttendanceContent
          details={details}
          isPresent={isPresent}
          onMarkPresent={handleMarkPresent}
        />
      </div>
    </div>
  );
}

export default Attendance;
