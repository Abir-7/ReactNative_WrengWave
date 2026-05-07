import CarSlider from "@/components/page/user/home/car_slide";
import LogoutButton from "@/components/ui/logout";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 justify-between px-4 bg-white"
      edges={["top", "left", "right"]}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-1 mt-4">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Welcome!</Text>
              <Text className="text-gray-500">Manage your cars here</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/add_car")}
              className="bg-black p-2 rounded-full"
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <CarSlider />
        </View>
      </ScrollView>

      <LogoutButton />
    </SafeAreaView>
  );
};

export default Home;
