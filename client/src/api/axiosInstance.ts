import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
)

//Response intercepto
axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
)

export default axiosInstance;
