import { UserRole } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function RoleSelectionScreen() {
  const router = useRouter();

  const selectRole = (role: UserRole) => {
    router.push({
      pathname: "/(auth)/signup",
      params: { role },
    });
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Join as a</Text>
      <Text className="text-gray-500 mb-10 text-lg">
        Choose how you would like to use the app
      </Text>

      <View className="gap-y-4">
        <TouchableOpacity
          onPress={() => selectRole("customer")}
          className="border-2 border-gray-100 bg-gray-50 rounded-2xl p-6 flex-row items-center"
        >
          <View className="bg-blue-100 p-3 rounded-full mr-4">
            <Ionicons name="person" size={32} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Customer</Text>
            <Text className="text-gray-500">
              I want to find mechanics for my vehicle
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectRole("mechanic")}
          className="border-2 border-gray-100 bg-gray-50 rounded-2xl p-6 flex-row items-center"
        >
          <View className="bg-orange-100 p-3 rounded-full mr-4">
            <Ionicons name="construct" size={32} color="#ea580c" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Mechanic</Text>
            <Text className="text-gray-500">
              I want to offer my repair services
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-10 items-center"
      >
        <Text className="text-blue-600 font-semibold">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
