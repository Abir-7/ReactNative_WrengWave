import { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ITEM_HEIGHT = 44;
const VISIBLE = 3;

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

function Drum({
  data,
  initialIndex = 0,
  onChange,
  width = 60,
}: {
  data: string[];
  initialIndex?: number;
  onChange?: (val: string) => void;
  width?: number;
}) {
  const ref = useRef<ScrollView>(null);
  const selectedRef = useRef(initialIndex);
  const [selected, setSelected] = useState(initialIndex);

  const snap = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);

    const clamped = Math.max(0, Math.min(data.length - 1, index));

    if (clamped !== selectedRef.current) {
      selectedRef.current = clamped;
      setSelected(clamped);
      onChange?.(data[clamped]);
    }

    ref.current?.scrollTo({
      y: clamped * ITEM_HEIGHT,
      animated: true,
    });
  };

  return (
    <View
      style={{
        width,
        height: ITEM_HEIGHT * VISIBLE,
        overflow: "hidden",
      }}
    >
      {/* Top fade */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
      />

      {/* Bottom fade */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
      />

      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentOffset={{
          x: 0,
          y: initialIndex * ITEM_HEIGHT,
        }}
        onMomentumScrollEnd={snap}
        onScrollEndDrag={snap}
        scrollEventThrottle={16}
        nestedScrollEnabled
        bounces={false}
        contentContainerStyle={{
          paddingTop: ITEM_HEIGHT,
          paddingBottom: ITEM_HEIGHT,
        }}
      >
        {data.map((item, index) => {
          const distance = Math.abs(index - selected);

          return (
            <View
              key={index}
              style={{
                height: ITEM_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: distance === 0 ? 24 : distance === 1 ? 18 : 15,
                  fontWeight: distance === 0 ? "600" : "400",
                  color:
                    distance === 0
                      ? "#111827"
                      : distance === 1
                        ? "#6B7280"
                        : "#D1D5DB",
                  fontVariant: ["tabular-nums"],
                }}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

type Props = {
  onChange?: (time: { hour: string; minute: string; period: string }) => void;
};

export default function TimePicker({ onChange }: Props) {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("32");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const hourRef = useRef("09");
  const minuteRef = useRef("32");
  const periodRef = useRef<"AM" | "PM">("AM");

  const notify = (h: string, m: string, p: string) => {
    onChange?.({
      hour: h,
      minute: m,
      period: p,
    });
  };

  return (
    <View style={{ gap: 20 }}>
      {/* Live Display */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <Text
          style={{
            fontSize: 44,
            fontWeight: "300",
            color: "#111827",
            letterSpacing: -1,
            fontVariant: ["tabular-nums"],
          }}
        >
          {hour}:{minute}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: "#6B7280",
          }}
        >
          {period}
        </Text>
      </View>

      {/* Picker Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Drums */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Active selector */}
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: "50%",
              left: 8,
              right: 8,
              height: ITEM_HEIGHT,
              marginTop: -ITEM_HEIGHT / 2,
              backgroundColor: "#F9FAFB",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              zIndex: 1,
            }}
          />

          <Drum
            data={hours}
            initialIndex={8}
            width={70}
            onChange={(v) => {
              hourRef.current = v;
              setHour(v);

              notify(v, minuteRef.current, periodRef.current);
            }}
          />

          <Text
            style={{
              fontSize: 26,
              fontWeight: "300",
              color: "#9CA3AF",
              zIndex: 2,
            }}
          >
            :
          </Text>

          <Drum
            data={minutes}
            initialIndex={32}
            width={70}
            onChange={(v) => {
              minuteRef.current = v;
              setMinute(v);

              notify(hourRef.current, v, periodRef.current);
            }}
          />
        </View>

        {/* AM PM */}
        <View
          style={{
            gap: 8,
          }}
        >
          {(["AM", "PM"] as const).map((p) => {
            const active = period === p;

            return (
              <TouchableOpacity
                key={p}
                activeOpacity={0.8}
                onPress={() => {
                  periodRef.current = p;
                  setPeriod(p);

                  notify(hourRef.current, minuteRef.current, p);
                }}
                style={{
                  width: 58,
                  height: 46,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: active ? "#111827" : "#E5E7EB",
                  backgroundColor: active ? "#111827" : "#F9FAFB",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: active ? "600" : "500",
                    color: active ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
