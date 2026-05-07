import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: ({ email, password }: any) =>
      authService.login(email, password),
    onSuccess: (data) => {
      setUser({
        role: data.role,
        name: data.name || "",
        token: data?.token,
        image_url: data?.image_url || "",
        email: data.email,
      });

      if (data.role === "admin") {
        router.replace("/(admin)/home");
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

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) => authService.signup(data),
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
    mutationFn: ({ email, otp, type }: any) =>
      authService.verifyOtp(email, otp, type),
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
    mutationFn: (data: any) => authService.resetPassword(data),
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
