import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function LogoutButton() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    clearUser();
    router.replace("/");
  };

  return (
    <TouchableOpacity
      className="bg-red-500 py-4 rounded-xl items-center"
      onPress={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-bold text-base">Logout</Text>
      )}
    </TouchableOpacity>
  );
}
