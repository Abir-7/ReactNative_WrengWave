import LoginScreen from "@/components/page/login";
import { useAuthStore } from "@/store/auth.store";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the navigation state to be initialized and store loading to complete
    if (navigationState?.key && !isLoading) {
      setIsReady(true);
    }
  }, [navigationState?.key, isLoading]);

  useEffect(() => {
    if (isReady && user?.token) {
      // Use a small delay to ensure the Root Layout has finished mounting its navigator
      const timer = setTimeout(() => {
        try {
          if (user.role === "mechanic") {
            router.replace("/(mechanic)/home");
          } else {
            router.replace("/(user)/home");
          }
        } catch (error) {
          console.warn("Navigation failed:", error);
        }
      }, 10); // 10ms is usually enough to clear the current execution stack
      return () => clearTimeout(timer);
    }
  }, [isReady, user?.token, user?.role, router]);

  // Show loading while initializing or when a redirect is pending
  if (isLoading || !isReady || user?.token) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Only show login if we are ready and NOT logged in
  return <LoginScreen />;
}
