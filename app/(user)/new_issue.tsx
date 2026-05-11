import DamageImageUpload from "@/components/page/user/new_issue/damage_image";
import { CalendarPicker } from "@/components/page/user/new_issue/date_picker";
import RecordSound from "@/components/page/user/new_issue/sound_record";

import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const New_issue = () => {
  return (
    <SafeAreaView className="px-4 flex gap-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <DamageImageUpload></DamageImageUpload>
        <RecordSound key={1}></RecordSound>
        <View>
          <Text className="text-lg font-medium text-gray-600 mb-2">
            Text Note
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Write issue...(optional)"
            textAlignVertical="top"
            className="border border-gray-300 rounded-xl p-4 h-32"
          />
        </View>
        <CalendarPicker></CalendarPicker>
      </ScrollView>
    </SafeAreaView>
  );
};

export default New_issue;
