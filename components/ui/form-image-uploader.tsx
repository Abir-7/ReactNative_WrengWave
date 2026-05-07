import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { ImageUploader } from "./image-uploader";

interface FormImageUploaderProps {
  name: string;
  label?: string;
  containerClassName?: string;
}

export const FormImageUploader = ({
  name,
  label,
  containerClassName = "mb-4",
}: FormImageUploaderProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className={containerClassName}>
          <ImageUploader
            label={label}
            initialImage={value}
            onUploadSuccess={onChange}
            containerClassName=""
          />
          {error && (
            <Text className="text-red-500 text-sm mt-1 ml-1">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};
