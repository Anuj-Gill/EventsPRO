import axios from 'axios';

export interface AuthUrlResponse {
	authUrl: string;
}

export const getGoogleAuthUrl = async (): Promise<string> => {
	try{
		const response = await axios.get<AuthUrlResponse>('http://localhost:5000/auth/google/url');
		return response.data.authUrl;
	} catch (error) {
		console.error('Error fetching Google Auth URL:', error);
		throw error;
	}
};
