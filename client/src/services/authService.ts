import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export interface AuthUrlResponse {
  authUrl: string;
}

export const getGoogleAuthUrl = async (): Promise<string> => {
  try {
    const response = await axios.get<AuthUrlResponse>(`${backendUrl}/auth/google/url`);
    return response.data.authUrl;
  } catch (error) {
    console.error('Error fetching Google Auth URL:', error);
    throw error;
  }
};
