import { UserRole } from "@/store/auth.store";

export interface LoginResponse {
  role: UserRole;
  access_token: string;
  refresh_token: string;
  user_id: string;
  is_mechanic_data_complete: boolean;
  is_user_car_data_complete: boolean;
}

export interface SignupPayload {
  email: string;
  password?: string;
  name?: string;
  role?: UserRole;
}
export interface SignupResponse {
  email: string;
  user_id: string;

  role?: UserRole;
}

export interface VerifyOtpPayload {
  user_id: string;
  code: string;
  type?: "signup" | "forgot-password";
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
  role: UserRole;
  is_active: boolean;
  profile: {
    full_name: string;
    bio: string;
    avatar_url: string;
  };
}
