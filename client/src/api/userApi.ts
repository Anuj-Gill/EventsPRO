import axiosInstance from "./axiosInstance";

export const userDataApi = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response;
  } catch (error) {
    console.error("Error getting user data:", error)
    throw error;
  }
}

export const userDataUpdateApi = async (details: any) => {
  try {
    const response = await axiosInstance.post("/user/profile", { details });
    return response;
  } catch (error) {
    console.error("Error updating user data:", error)
    throw error;
  }
}


interface FeedbackDetails {
  rating: number,
  comment: string
}

export const addFeedbackApi = async (details: FeedbackDetails) => {
  try {
    const response = await axiosInstance.post("/user/add/feedback", { details });
    return response;
  } catch (error) {
    console.error("Error checking if registered!", error);
    throw error;
  }
}

export const getFeedbacksApi = async () => {
  try {
    const response = await axiosInstance.get("/user/feedbacks");
    return response;
  } catch (error) {
    console.error("Error fetching feedbakcs!", error);
    throw error;
  }
}
