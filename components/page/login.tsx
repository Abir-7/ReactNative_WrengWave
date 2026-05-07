import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Replace with your real API call
    const response = await fakeLoginApi(email, password);

    setUser({
      role: response.role,
      name: response.name,
      token: response.token,
      image_url: response.image_url,
      email: response.email,
    });

    if (response.role === "admin") {
      router.replace("/(admin)/home");
    } else {
      router.replace("/(user)/home");
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-gray-900">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base text-gray-900"
        placeholder="Email"
        placeholderTextColor="#9ca3af"
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
        className="bg-black py-4 rounded-xl items-center"
        onPress={handleLogin}
      >
        <Text className="text-white font-bold text-base">Login</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/role-selection")}>
          <Text className="text-blue-600 font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function fakeLoginApi(email: string, password: string) {
  return {
    role: email.includes("admin") ? "admin" : ("user" as "admin" | "user"),
    name: "John Doe",
    token: "abc123token",
    image_url: "https://i.pravatar.cc/150",
    email,
  };
}
