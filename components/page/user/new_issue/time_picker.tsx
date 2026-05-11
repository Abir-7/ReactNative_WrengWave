import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { TimerPickerModal } from "react-native-timer-picker";

const TimePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);

  const formatTime = ({
    hours,
    minutes,
  }: {
    hours?: number;
    minutes?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }

    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#514242]">
      <Text className="text-[18px] text-[#F1F1F1]">
        {alarmString !== null ? "Alarm set for" : "No alarm set"}
      </Text>

      {alarmString !== null && (
        <Text className="mt-2 text-[48px] text-[#F1F1F1]">{alarmString}</Text>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowPicker(true)}
        className="mt-8"
      >
        <Text className="overflow-hidden rounded-[10px] border border-[#C2C2C2] px-[18px] py-[10px] text-[16px] text-[#C2C2C2]">
          Set Alarm 🔔
        </Text>
      </TouchableOpacity>

      <TimerPickerModal
        hideSeconds
        visible={showPicker}
        setIsVisible={setShowPicker}
        onCancel={() => setShowPicker(false)}
        onConfirm={(pickedDuration) => {
          setAlarmString(formatTime(pickedDuration));
          setShowPicker(false);
        }}
        closeOnOverlayPress
        modalTitle="Set Alarm"
        LinearGradient={LinearGradient}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
};

export default TimePicker;
