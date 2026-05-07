/* eslint-disable import/no-named-as-default-member */
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

// Replace this with your actual environment variable or base URL
export const BASE_URL = "http://10.10.12.70:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Auto logout on unauthorized
      useAuthStore.getState().clearUser();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
