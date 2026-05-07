import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email, type } = useLocalSearchParams<{ email: string; type: "signup" | "forgot-password" }>();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Implement OTP verification logic here
    console.log("Verifying OTP:", otp, "for type:", type);
    
    if (type === "signup") {
      // After signup verification, redirect to login
      router.replace("/");
    } else if (type === "forgot-password") {
      // After forgot-password verification, redirect to reset password
      router.push({
        pathname: "/(auth)/reset-password",
        params: { email, otp }
      });
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="mb-8 self-start"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Verify Code</Text>
      <Text className="text-gray-500 mb-8 text-lg">
        Enter the 4-digit code sent to {email}
      </Text>

      <View className="mb-8">
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-widest text-gray-900"
          placeholder="0000"
          placeholderTextColor="#9ca3af"
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <TouchableOpacity
        className={`bg-black py-4 rounded-xl items-center mb-6 ${verifyOtpMutation.isPending ? 'opacity-70' : ''}`}
        onPress={handleVerify}
        disabled={verifyOtpMutation.isPending}
      >
        {verifyOtpMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Verify</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-600">Didn't receive the code? </Text>
        <TouchableOpacity onPress={() => console.log("Resend OTP")}>
          <Text className="text-blue-600 font-bold">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
