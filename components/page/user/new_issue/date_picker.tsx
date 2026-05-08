import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type Props = {
  onSelect?: (date: Date) => void;
};

export default function DateTimePicker({ onSelect }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Days from previous month to fill first row
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1,
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const handleSelect = (day: number, type: "prev" | "current" | "next") => {
    let year = viewYear;
    let month = viewMonth;
    if (type === "prev") {
      month = viewMonth === 0 ? 11 : viewMonth - 1;
      year = viewMonth === 0 ? viewYear - 1 : viewYear;
    } else if (type === "next") {
      month = viewMonth === 11 ? 0 : viewMonth + 1;
      year = viewMonth === 11 ? viewYear + 1 : viewYear;
    }
    const date = new Date(year, month, day);
    setSelectedDate(date);
    if (type !== "current") {
      setViewMonth(month);
      setViewYear(year);
    }
    onSelect?.(date);
  };

  const isSelected = (day: number, type: string) =>
    type === "current" &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;

  const isToday = (day: number, type: string) =>
    type === "current" &&
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  // Build calendar grid cells
  type Cell = { day: number; type: "prev" | "current" | "next" };
  const cells: Cell[] = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, type: "prev" });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, type: "current" });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, type: "next" });
  }

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <View className="rounded-2xl px-4 pt-4 pb-5">
      {/* Title */}
      <Text className="text-gray-900 text-lg font-semibold mb-3">
        Choose Date & Time
      </Text>

      {/* Month navigation */}
      <View
        className="flex-row items-center justify-between rounded-xl px-3 py-2 mb-3"
        style={{ backgroundColor: "#EEF3FF" }}
      >
        <TouchableOpacity
          onPress={prevMonth}
          className="p-1"
          activeOpacity={0.6}
        >
          <Text className="text-gray-600 text-base">{"‹"}</Text>
        </TouchableOpacity>
        <Text className="text-gray-700 text-sm font-medium">
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity
          onPress={nextMonth}
          className="p-1"
          activeOpacity={0.6}
        >
          <Text className="text-gray-600 text-base">{"›"}</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View className="flex-row mb-1">
        {DAYS.map((d, i) => (
          <View
            key={i}
            style={{ flex: 1, alignItems: "center", paddingVertical: 4 }}
          >
            <Text className="text-xs text-gray-400 font-medium">{d}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      {weeks.map((week, wi) => (
        <View key={wi} className="flex-row">
          {week.map((cell, di) => {
            const selected = isSelected(cell.day, cell.type);
            const todayCell = isToday(cell.day, cell.type);
            const isOtherMonth = cell.type !== "current";

            return (
              <TouchableOpacity
                key={di}
                onPress={() => handleSelect(cell.day, cell.type)}
                activeOpacity={0.7}
                style={{ flex: 1, alignItems: "center", paddingVertical: 3 }}
              >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: selected ? "#4F7FFA" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: selected ? "600" : todayCell ? "700" : "400",
                      color: selected
                        ? "#fff"
                        : isOtherMonth
                          ? "#c0c0c0"
                          : todayCell
                            ? "#4F7FFA"
                            : "#1a1a1a",
                    }}
                  >
                    {cell.day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}
