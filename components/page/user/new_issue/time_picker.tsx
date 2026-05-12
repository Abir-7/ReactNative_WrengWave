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
        Slected Time
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          paddingBottom: 2,
        }}
      >
        {alarmString !== null ? (
          <Text style={{ color: "#202020", fontSize: 28 }}>{alarmString}</Text>
        ) : (
          <Text style={{ color: "#202020", fontSize: 28 }}>12:00 PM</Text>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowPicker(true)}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPicker(true)}
            >
              <View style={{}}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 16,
                    overflow: "hidden",
                    borderColor: "#8C8C8C",
                    color: "#8C8C8C",
                  }}
                >
                  {"Set Time"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
            container: {},
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
