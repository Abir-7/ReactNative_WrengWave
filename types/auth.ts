import { UserRole } from "@/store/auth.store";

export interface LoginResponse {
  role: UserRole;
  name?: string;
  token: string;
  image_url?: string;
  email: string;
}

export interface SignupPayload {
  email: string;
  password?: string;
  name?: string;
  role?: UserRole;
  [key: string]: any;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
  type: "signup" | "forgot-password";
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirm_password: string;
}

export interface GetMeResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image_url: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
