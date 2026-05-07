import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-gray-900">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base text-gray-900"
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-2 text-base text-gray-900"
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="self-end mb-6"
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text className="text-blue-600 font-medium">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`bg-black py-4 rounded-xl items-center ${loginMutation.isPending ? "opacity-70" : ""}`}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Login</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/role-selection")}>
          <Text className="text-blue-600 font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
