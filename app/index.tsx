import LoginScreen from "@/components/page/login";
import { useAuthStore } from "@/store/auth.store";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Still loading from AsyncStorage
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Already logged in → redirect based on role
  if (user?.token) {
    if (user.role === "admin") {
      return <Redirect href="/(admin)/home" />;
    }
    return <Redirect href="/(user)/home" />;
  }

  // Not logged in → show login
  return <LoginScreen />;
}
