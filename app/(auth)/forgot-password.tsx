import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetRequest = () => {
    // Implement password reset request logic here
    console.log("Password reset requested for:", email);
    // After success, navigate to verify OTP screen
    router.push({
      pathname: "/(auth)/verify-otp",
      params: { email, type: "forgot-password" }
    });
  };

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="mb-8 self-start"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</Text>
      <Text className="text-gray-500 mb-8 text-lg">
        Enter your email address and we'll send you a code to reset your password.
      </Text>

      <View className="mb-8">
        <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900"
          placeholder="example@mail.com"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        className="bg-black py-4 rounded-xl items-center"
        onPress={handleResetRequest}
      >
        <Text className="text-white font-bold text-base">Send Code</Text>
      </TouchableOpacity>
    </View>
  );
}
