import LogoutButton from "@/components/ui/logout";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-between  "
      edges={["top", "left", "right"]}
    >
      <View className="flex-1 ">
        <Text>home</Text>
      </View>

      <LogoutButton />
    </SafeAreaView>
  );
};

export default Home;
