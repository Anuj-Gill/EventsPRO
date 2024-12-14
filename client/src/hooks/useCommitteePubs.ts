import { useState, useEffect } from "react";
import { getCommitteePubs } from "../api/committeeApi";

const useCommitteePubs = () => {
  const [pubs, setPubs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPubs = async () => {
    try {
      setLoading(true);
      const response = await getCommitteePubs();
      if (response.data.pubs) {
        setPubs(response.data.pubs);
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPubs();
  }, []);

  return {
    pubs,
    loading,
    error,
    refetch: getPubs  // Add refetch method
  }
}

export default useCommitteePubs;
