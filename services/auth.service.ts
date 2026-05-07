import {
  GetMeResponse,
  LoginResponse,
  ResetPasswordPayload,
  SignupPayload,
  VerifyOtpPayload,
} from "@/types/auth";
import apiClient from "../api/client";

export const authService = {
  login: async (
    user_email: string,
    password: string,
  ): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", {
      user_email,
      password,
    });
    return response.data;
  },

  signup: async (data: SignupPayload) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  verifyUser: async (data: VerifyOtpPayload) => {
    const response = await apiClient.post("/auth/verify-user", data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await apiClient.post("/auth/reset-password", data);
    return response.data;
  },

  getMe: async (): Promise<GetMeResponse> => {
    const response = await apiClient.get("/common/me");
    return response.data;
  },
};
