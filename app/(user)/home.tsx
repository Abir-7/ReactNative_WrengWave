import CarSlider from "@/components/page/user/home/car_slide";
import LogoutButton from "@/components/ui/logout";
import { useGetUserCars } from "@/hooks/useCar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const { data: user_cars, isPending: isUserCarLoading } = useGetUserCars();

  return (
    <SafeAreaView
      className="flex-1 justify-between px-4 bg-white"
      edges={["top", "left", "right"]}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-1 mt-4 gap-7">
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

          <CarSlider user_cars={user_cars || []} />

          <TouchableOpacity
            onPress={() => {
              router.push("/(user)/new_issue");
            }}
            className="w-full bg-orange-400 h-14 rounded-xl flex items-center justify-center "
          >
            <Text className="text-white text-center text-xl">
              Scedule new service
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LogoutButton />
    </SafeAreaView>
  );
};

export default Home;
