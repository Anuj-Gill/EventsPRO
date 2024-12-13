import axiosInstance from "./axiosInstance";

export const getStudentDetails = async (token: string) => {
  try {
    const response = await axiosInstance.post("/qrcode/verify", { token });
    return response;

  } catch (error) {
    console.error("Error getting student details for attendance!")
    throw error;
  }
}

export const markStudentPresent = async (token: string) => {
  try {
    const response = await axiosInstance.post("/qrcode/attendance", { token });
    return response;
  } catch (error) {
    console.error("Error marking student's attendance");
    throw error;

  }
}
