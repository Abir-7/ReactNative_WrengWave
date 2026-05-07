export interface LoginResponse {
  role: "admin" | "user";
  name?: string;
  token: string;
  image_url?: string;
  email: string;
}

export interface SignupPayload {
  email: string;
  password?: string;
  name?: string;
  role?: "admin" | "user";
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
  role: "admin" | "user";
  image_url: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
