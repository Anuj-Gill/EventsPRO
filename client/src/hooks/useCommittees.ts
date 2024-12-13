import { useState, useEffect } from "react";
import { getCommittees } from "../api/committeeApi";

export const useCommittees = () => {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCommittees = async () => {
    try {
      const response = await getCommittees();       // Fetch committees from API.
      if (response.data.committees) {
        setCommittees(response.data.committees);    // Save data to state.
      }
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Extract the error message safely.
      } else {
        setError(String(error)); // Fallback in case it's not an Error object.
      }
      console.error("Error fetching committees:", error);
    }
    finally {

      setLoading(false);                            // Stop loading after the request.
    }
  };

  useEffect(() => {
    fetchCommittees();                              // Call fetchCommittees on component mount.
  }, []);

  // Return state and actions for components to use.
  return { committees, loading, error };

}
