import apiClient from "../api/client";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  signup: async (data: any) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string, type: string) => {
    const response = await apiClient.post("/auth/verify-otp", { email, otp, type });
    return response.data;
  },

  resetPassword: async (data: any) => {
    const response = await apiClient.post("/auth/reset-password", data);
    return response.data;
  },
};
