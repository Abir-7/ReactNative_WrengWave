import CarSlider from "@/components/page/user/home/car_slide";
import LogoutButton from "@/components/ui/logout";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-between px-2  "
      edges={["top", "left", "right"]}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-1 ">
          <CarSlider></CarSlider>
        </View>
      </ScrollView>

      <LogoutButton />
    </SafeAreaView>
  );
};

export default Home;
