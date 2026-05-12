import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  name: string;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export const FormInput = ({
  name,
  label,
  containerClassName = "mb-4",
  inputClassName = "",
  secureTextEntry,
  ...textInputProps
}: FormInputProps) => {
  const { control } = useFormContext();
  const { errors } = useFormState({
    control,
    name,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPasswordField = secureTextEntry !== undefined;
  const error = errors[name]?.message as string | undefined;

  return (
    <View className={containerClassName}>
      {label && <Text className="text-gray-700 mb-2 font-medium">{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative justify-center">
            <TextInput
              className={`border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-xl px-4 py-3 text-base text-gray-900 ${
                isPasswordField ? "pr-12" : ""
              } ${inputClassName}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#9ca3af"
              secureTextEntry={isPasswordField && !isPasswordVisible}
              {...textInputProps}
            />
            {isPasswordField && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-4"
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
};
