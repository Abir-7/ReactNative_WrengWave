import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

const Time_picker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);

  const formatTime = ({
    hours,
    minutes,
  }: {
    hours?: number;
    minutes?: number;
  }) => {
    if (hours === undefined) return "";

    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;

    const formattedMinutes =
      minutes !== undefined ? minutes.toString().padStart(2, "0") : "00";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <View>
      <Text className="text-lg font-medium text-gray-600 mb-2">
        Selected Time
      </Text>
      <View className="flex-row justify-between items-center p-0.5 pb-1">
        {alarmString !== null ? (
          <Text className="text-[#202020] text-[28px] font-medium">
            {alarmString}
          </Text>
        ) : (
          <Text className="text-[#202020] text-[28px] font-medium">
            12:00 PM
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowPicker(true)}
          className="items-center"
        >
          <Text className="py-2.5 px-[18px] border border-[#8C8C8C] rounded-[10px] text-base overflow-hidden text-[#8C8C8C]">
            Set Time
          </Text>
        </TouchableOpacity>
        <TimerPickerModal
          hideSeconds
          closeOnOverlayPress
          LinearGradient={LinearGradient}
          modalTitle="Set Time"
          onCancel={() => setShowPicker(false)}
          onConfirm={(pickedDuration) => {
            setAlarmString(formatTime(pickedDuration));
            setShowPicker(false);
          }}
          setIsVisible={setShowPicker}
          styles={{
            theme: "light",
            contentContainer: { width: 300 },
            pickerColumnWidth: {
              hours: 120,
            },
          }}
          use12HourPicker
          visible={showPicker}
        />
      </View>
    </View>
  );
};

export default Time_picker;
