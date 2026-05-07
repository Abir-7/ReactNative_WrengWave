import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import {
  LoginResponse,
  ResetPasswordPayload,
  SignupPayload,
  SignupResponse,
  VerifyOtpPayload,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  return useMutation({
    mutationFn: ({
      user_email,
      password,
    }: {
      user_email: string;
      password: string;
    }): Promise<LoginResponse> => authService.login(user_email, password),
    onSuccess: async (data) => {
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back`,
      });

      // First set the basic info from login
      setUser({
        role: data.role,
        name: "",
        token: data?.access_token,
        image_url: "",
        email: "",
        user_id: data.user_id,
        refresh_token: data?.refresh_token,
      });

      // Then fetch the full profile
      try {
        const profile = await authService.getMe();
        setProfile({
          email: profile.email || "",
          image_url: profile.profile.avatar_url || "",
          name: profile.profile.full_name || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile after login:", error);
      }

      if (data.role === "mechanic") {
        router.replace("/(mechanic)/home");
      } else {
        router.replace("/(user)/home");
      }
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    },
  });
}

export function useGetMe() {
  const setProfile = useAuthStore((state) => state.setProfile);
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => authService.getMe(),
    onSuccess: (data) => {
      setProfile(data);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        clearUser();
      }
    },
  });
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupPayload): Promise<SignupResponse> =>
      authService.signup(data),
    onSuccess: (_, variables) => {
      Toast.show({
        type: "success",
        text1: "Account Created",
        text2: "Please verify your email to continue",
      });
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: variables.email, type: "signup", user_id: _.user_id },
      });
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (_, email) => {
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: "Check your email for the verification code",
      });
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email, type: "forgot-password" },
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Could not send reset code",
      });
    },
  });
}

export function useVerifyUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) =>
      authService.verifyUser({ code: data.code, user_id: data.user_id }),
    onSuccess: (_, variables) => {
      Toast.show({
        type: "success",
        text1: "Verified",
        text2: "OTP verified successfully",
      });
      if (variables.type === "signup") {
        router.replace("/");
      } else {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { user_id: variables.user_id, otp: variables.code },
        });
      }
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: error.response?.data?.message || "Invalid OTP",
      });
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => authService.resetPassword(data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password reset successfully",
      });
      router.replace("/");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to reset password",
      });
    },
  });
}
