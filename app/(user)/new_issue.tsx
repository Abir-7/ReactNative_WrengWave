import RecordSound from "@/components/page/user/new_issue/sound_record";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const New_issue = () => {
  return (
    <SafeAreaView className="px-2">
      <Text>new_issue</Text>
      <RecordSound key={1}></RecordSound>
    </SafeAreaView>
  );
};

export default New_issue;
