import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface FormImageProps {
  name: string;
  label?: string;
  containerClassName?: string;
}

export const FormImage = ({
  name,
  label,
  containerClassName = "mb-4",
}: FormImageProps) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control, name });

  const error = errors[name]?.message as string | undefined;

  const pickImage = async (onChange: (value: any) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View className={containerClassName}>
      {label && <Text className="text-gray-700 mb-2 font-medium">{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View>
            <TouchableOpacity
              onPress={() => pickImage(onChange)}
              className="w-full h-40 border border-gray-300 rounded-xl items-center justify-center bg-gray-50"
            >
              {value ? (
                <Image
                  source={{ uri: value }}
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

            {value && (
              <TouchableOpacity
                onPress={() => onChange(null)}
                className="mt-2 flex-row items-center"
              >
                <Ionicons name="trash-outline" size={18} color="red" />
                <Text className="text-red-500 ml-1">Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};
