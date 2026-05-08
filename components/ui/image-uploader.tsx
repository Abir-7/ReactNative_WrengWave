import { ENV } from "@/app_config/config";
import { fileService } from "@/services/file.service";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageUploaderProps {
  label?: string;
  initialImage?: string;
  onUploadSuccess?: (url: string) => void;
  containerClassName?: string;
}

export const ImageUploader = ({
  label,
  initialImage,
  onUploadSuccess,
  containerClassName = "mb-4",
}: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!initialImage) {
      setImage(null);
    }
  }, [initialImage]);

  const pickImage = async () => {
    // Request permission first (good practice)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      uploadImage(selectedUri);
    }
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);

    try {
      const uploadedUrl = await fileService.uploadImage(uri);
      setImage(`${ENV.BASE_URL}${uploadedUrl.uri}`);
      if (onUploadSuccess) {
        onUploadSuccess(uploadedUrl.image_id);
      }
    } catch (error) {
      console.error("Upload failed", error);
      // You might want to use a toast here
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (onUploadSuccess) {
      onUploadSuccess("");
    }
  };

  return (
    <View className={containerClassName}>
      {label && <Text className="text-gray-700 mb-2 font-medium">{label}</Text>}

      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className="w-full h-40 border border-gray-300 rounded-xl items-center justify-center bg-gray-50 overflow-hidden"
      >
        {uploading ? (
          <View className="items-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-500 mt-2">Uploading...</Text>
          </View>
        ) : image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Ionicons name="image-outline" size={30} color="#6b7280" />
            <Text className="text-gray-500 mt-2">Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {image && !uploading && (
        <TouchableOpacity
          onPress={removeImage}
          className="mt-2 flex-row items-center"
        >
          <Ionicons name="trash-outline" size={18} color="red" />
          <Text className="text-red-500 ml-1">Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
