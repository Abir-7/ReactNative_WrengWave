import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CLOCK_SIZE = width * 0.75;
const CX = CLOCK_SIZE / 2;
const CY = CLOCK_SIZE / 2;
const R = CLOCK_SIZE / 2 - 20;

export default function TimePicker() {
  const [mode, setMode] = useState("h"); // 'h' | 'm'
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState("AM");
  const [confirmed, setConfirmed] = useState(null);

  const pad = (n) => String(n).padStart(2, "0");

  const hourNums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minNums = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const nums = mode === "h" ? hourNums : minNums;

  const getNumPos = (index) => {
    const angle = (-90 + index * 30) * (Math.PI / 180);
    return {
      x: CX + Math.cos(angle) * (R - 24),
      y: CY + Math.sin(angle) * (R - 24),
    };
  };

  const handleClockPress = (evt) => {
    const { locationX: lx, locationY: ly } = evt.nativeEvent;
    const mx = lx - CX;
    const my = ly - CY;
    const dist = Math.sqrt(mx * mx + my * my);
    if (dist < 28 || dist > R + 10) return;

    let best = null,
      bestD = 999;
    nums.forEach((v, i) => {
      const { x, y } = getNumPos(i);
      const d = Math.sqrt((lx - x) ** 2 + (ly - y) ** 2);
      if (d < bestD) {
        bestD = d;
        best = v;
      }
    });

    if (best !== null) {
      if (mode === "h") {
        setHour(best);
        setTimeout(() => setMode("m"), 200);
      } else {
        setMinute(best);
      }
    }
  };

  const selectedIndex = nums.indexOf(mode === "h" ? hour : minute);
  const handPos = selectedIndex >= 0 ? getNumPos(selectedIndex) : null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.timeBig}>
            {pad(hour)}:{pad(minute)}
          </Text>
          <View style={styles.apCol}>
            {["AM", "PM"].map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.apBtn, ampm === v && styles.apBtnOn]}
                onPress={() => setAmpm(v)}
              >
                <Text style={[styles.apText, ampm === v && styles.apTextOn]}>
                  {v}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["h", "m"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, mode === t && styles.tabOn]}
              onPress={() => setMode(t)}
            >
              <Text style={[styles.tabText, mode === t && styles.tabTextOn]}>
                {t === "h" ? "Hour" : "Minute"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clock face */}
        <View style={styles.clockWrap}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleClockPress}
            style={styles.clockFace}
          >
            {/* Hand line */}
            {handPos && (
              <View
                style={[
                  styles.hand,
                  {
                    width: Math.sqrt(
                      (handPos.x - CX) ** 2 + (handPos.y - CY) ** 2,
                    ),
                    transform: [
                      { translateX: CX },
                      { translateY: CY },
                      {
                        rotate: `${
                          Math.atan2(handPos.y - CY, handPos.x - CX) *
                          (180 / Math.PI)
                        }deg`,
                      },
                      { translateX: 0 },
                    ],
                  },
                ]}
              />
            )}

            {/* Center dot */}
            <View style={styles.centerDot} />

            {/* Numbers */}
            {nums.map((v, i) => {
              const { x, y } = getNumPos(i);
              const isSel = v === (mode === "h" ? hour : minute);
              return (
                <View
                  key={v}
                  style={[
                    styles.numCircle,
                    isSel && styles.numCircleSel,
                    { left: x - 20, top: y - 20 },
                  ]}
                >
                  <Text style={[styles.numText, isSel && styles.numTextSel]}>
                    {mode === "h" ? v : pad(v)}
                  </Text>
                </View>
              );
            })}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => {
              setHour(12);
              setMinute(0);
              setAmpm("AM");
              setMode("h");
            }}
          >
            <Text style={styles.btnCancelText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => setConfirmed(`${pad(hour)}:${pad(minute)} ${ampm}`)}
          >
            <Text style={styles.btnConfirmText}>Set time</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Result */}
      {confirmed && (
        <View style={styles.result}>
          <Text style={styles.resultTime}>{confirmed}</Text>
          <Text style={styles.resultLabel}>Alarm set</Text>
        </View>
      )}
    </View>
  );
}

const ACCENT = "#534AB7";

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  card: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0d8",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0d8",
  },
  timeBig: {
    fontSize: 38,
    fontWeight: "500",
    color: "#1a1a18",
    letterSpacing: -0.5,
  },
  apCol: { gap: 6 },
  apBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e0e0d8",
  },
  apBtnOn: { backgroundColor: "#1a1a18", borderColor: "#1a1a18" },
  apText: { fontSize: 13, fontWeight: "500", color: "#888" },
  apTextOn: { color: "#fff" },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0d8",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabOn: { borderBottomColor: "#1a1a18" },
  tabText: { fontSize: 13, color: "#888" },
  tabTextOn: { fontWeight: "500", color: "#1a1a18" },
  clockWrap: { alignItems: "center", padding: 20 },
  clockFace: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: CLOCK_SIZE / 2,
    backgroundColor: "#f1efe8",
  },
  hand: {
    position: "absolute",
    height: 2,
    backgroundColor: ACCENT,
    transformOrigin: "left center",
  },
  centerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT,
    left: CX - 4,
    top: CY - 4,
  },
  numCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  numCircleSel: { backgroundColor: ACCENT },
  numText: { fontSize: 14, color: "#1a1a18" },
  numTextSel: { color: "#fff", fontWeight: "500" },
  footer: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#e0e0d8",
  },
  btnCancel: {
    flex: 1,
    padding: 11,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e0e0d8",
  },
  btnCancelText: { fontSize: 15, color: "#888" },
  btnConfirm: {
    flex: 2,
    padding: 11,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#1a1a18",
  },
  btnConfirmText: { fontSize: 15, fontWeight: "500", color: "#fff" },
  result: {
    marginTop: 12,
    padding: 14,
    backgroundColor: "#f1efe8",
    borderRadius: 10,
  },
  resultTime: { fontSize: 20, fontWeight: "500", color: "#1a1a18" },
  resultLabel: { fontSize: 12, color: "#888", marginTop: 2 },
});
