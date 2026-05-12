import { useState } from "react";
import { Text, View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

export function CalendarPicker() {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();

  return (
    <>
      <Text className="text-lg font-medium text-gray-600 ">Slected Date</Text>
      <View className="border border-gray-300 rounded-lg relative -top-3">
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={({ date }) => setSelected(date)}
          styles={defaultStyles}
          className=""
        />
      </View>
    </>
  );
}
