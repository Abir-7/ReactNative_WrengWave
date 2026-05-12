import LoginScreen from "@/components/page/login";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.token) {
      if (user.role === "mechanic") {
        router.replace("/(mechanic)/home");
      } else {
        router.replace("/(user)/home");
      }
    }
  }, [isLoading, user?.token, user?.role, router]);

  // Still loading from AsyncStorage or redirecting
  if (isLoading || user?.token) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Not logged in → show login
  return <LoginScreen />;
}
