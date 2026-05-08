/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from "@expo/vector-icons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, TouchableOpacity, View } from "react-native";

export default function RecordSound() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(recordingUri ?? "");

  // Animated values for each bar
  const bars = [
    3, 6, 10, 7, 14, 9, 5, 12, 8, 15, 6, 11, 4, 9, 13, 7, 5, 10, 8, 6,
  ];
  const animValues = useRef(bars.map(() => new Animated.Value(1))).current;
  const animLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  const startWaveAnimation = () => {
    const animations = animValues.map((val, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 40),
          Animated.timing(val, {
            toValue: 2.2,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0.5,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    animLoopRef.current = Animated.parallel(animations);
    animLoopRef.current.start();
  };

  const stopWaveAnimation = () => {
    animLoopRef.current?.stop();
    animValues.forEach((val) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(),
    );
  };

  useEffect(() => {
    if (isPlaying || recorderState.isRecording) {
      startWaveAnimation();
    } else {
      stopWaveAnimation();
    }
  }, [isPlaying, recorderState.isRecording]);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) Alert.alert("Microphone permission denied");
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  useEffect(() => {
    if (!player) return;
    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.didJustFinish) setIsPlaying(false);
      },
    );
    return () => subscription.remove();
  }, [player]);

  const toggleRecord = async () => {
    if (recorderState.isRecording) {
      await audioRecorder.stop();
      if (audioRecorder.uri) setRecordingUri(audioRecorder.uri);
    } else {
      setRecordingUri(null);
      setIsPlaying(false);
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }
  };

  const togglePlay = () => {
    if (!player || !recordingUri) return;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.seekTo(0);
      player.play();
      setIsPlaying(true);
    }
  };

  const hasRecording = !!recordingUri;
  const isRecording = recorderState.isRecording;

  // Bar color based on state
  const barColor = isRecording ? "#f87171" : isPlaying ? "#fb923c" : "#fb923c";

  return (
    <View className="  items-center justify-center bg-[#FFF4E6]">
      <View className="flex-row items-center  rounded-full px-4 py-3 gap-4">
        {/* Play / Pause — always visible, disabled if no recording */}
        <TouchableOpacity
          onPress={togglePlay}
          disabled={!hasRecording || isRecording}
          className={`w-11 h-11 rounded-full items-center justify-center ${
            hasRecording && !isRecording ? "bg-orange-400" : "bg-orange-400"
          }`}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={18}
            color={hasRecording && !isRecording ? "#fff" : "#aaa"}
          />
        </TouchableOpacity>

        {/* Animated waveform */}
        <View
          className="flex-row  justify-center items-center gap-0.5 flex-1"
          style={{ height: 40 }}
        >
          {bars.map((h, i) => (
            <Animated.View
              key={i}
              style={{
                width: 3,
                height: h * 2,
                borderRadius: 99,
                backgroundColor: barColor,
                transform: [{ scaleY: animValues[i] }],
              }}
            />
          ))}
        </View>

        {/* Record / Stop — always visible */}
        <TouchableOpacity
          onPress={toggleRecord}
          className={`w-11 h-11 rounded-full items-center justify-center ${
            isRecording ? "bg-red-500" : "bg-orange-400"
          }`}
          activeOpacity={0.7}
        >
          {isRecording ? (
            <View className="w-4 h-4 rounded-sm bg-white" />
          ) : (
            <View className="w-3.5 h-3.5 rounded-full bg-white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
