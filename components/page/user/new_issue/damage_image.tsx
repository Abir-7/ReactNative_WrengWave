import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MAX = 3;

type ImageItem = {
  uri: string;
  id: string;
};

export default function DamageImageUpload() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const pickImage = async () => {
    if (images.length >= MAX) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages((prev) => [
        ...prev,
        { uri: result.assets[0].uri, id: Date.now().toString() },
      ]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const slots = Array.from({ length: MAX });

  return (
    <View>
      <Text className="text-lg font-medium text-gray-600 mb-2">
        Upload Image
      </Text>
      <View className="flex-row gap-3">
        {slots.map((_, i) => {
          const img = images[i];

          if (img) {
            // Filled slot
            return (
              <View key={img.id} className="relative">
                <Image
                  source={{ uri: img.uri }}
                  className="w-24 h-24 rounded-2xl bg-gray-100"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => removeImage(img.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900 items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Ionicons name="close" size={11} color="#fff" />
                </TouchableOpacity>
              </View>
            );
          }

          // Empty slot — only first empty slot is tappable
          const isNext = i === images.length;
          return (
            <TouchableOpacity
              key={i}
              onPress={isNext ? pickImage : undefined}
              disabled={!isNext}
              activeOpacity={0.6}
              className={`w-24 h-24 rounded-2xl border-2 border-dashed items-center justify-center gap-1 ${
                isNext
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-gray-50 opacity-40"
              }`}
            >
              <Ionicons
                name="image-outline"
                size={22}
                color={isNext ? "#9ca3af" : "#d1d5db"}
              />
              {isNext && (
                <Text className="text-xs text-gray-400">
                  {images.length === 0 ? "Add photo" : "Add more"}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text className="mt-2 text-gray-400">Max 3 photos</Text>
    </View>
  );
}
