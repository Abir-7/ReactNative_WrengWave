import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Implement password reset logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Resetting password for:", email, "with OTP:", otp);
    // After success, redirect to login
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="mb-8 self-start"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">New Password</Text>
      <Text className="text-gray-500 mb-8 text-lg">
        Create a new, strong password for your account.
      </Text>

      <View className="gap-y-6 mb-10">
        <View>
          <Text className="text-gray-700 mb-2 font-medium">New Password</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-2 font-medium">Confirm New Password</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <TouchableOpacity
        className="bg-black py-4 rounded-xl items-center"
        onPress={handleResetPassword}
      >
        <Text className="text-white font-bold text-base">Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}
