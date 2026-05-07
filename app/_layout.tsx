/* eslint-disable react-hooks/exhaustive-deps */

import { useGetMe } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
      <Toast />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const user = useAuthStore((state) => state.user);
  const { mutate: getMe } = useGetMe();

  useEffect(() => {
    if (user?.token) {
      getMe();
    }
  }, []);

  return (
    <>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(mechanic)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
