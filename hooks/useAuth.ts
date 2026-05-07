import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import {
  ResetPasswordPayload,
  SignupPayload,
  VerifyOtpPayload,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  return useMutation({
    mutationFn: ({ email, password }: any) =>
      authService.login(email, password),
    onSuccess: async (data) => {
      // First set the basic info from login
      setUser({
        role: data.role,
        name: data.name || "",
        token: data?.token,
        image_url: data?.image_url || "",
        email: data.email,
      });

      // Then fetch the full profile
      try {
        const profile = await authService.getMe();
        setProfile(profile);
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
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong",
      );
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
    mutationFn: (data: SignupPayload) => authService.signup(data),
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: variables.email, type: "signup" },
      });
    },
    onError: (error: any) => {
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || "Something went wrong",
      );
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (_, email) => {
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email, type: "forgot-password" },
      });
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Could not send reset code",
      );
    },
  });
}

export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => authService.verifyOtp(data),
    onSuccess: (_, variables) => {
      if (variables.type === "signup") {
        router.replace("/");
      } else {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email: variables.email, otp: variables.otp },
        });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Verification Failed",
        error.response?.data?.message || "Invalid OTP",
      );
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => authService.resetPassword(data),
    onSuccess: () => {
      Alert.alert("Success", "Password reset successfully", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to reset password",
      );
    },
  });
}
