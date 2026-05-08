import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

interface FormWrapperProps<T extends FieldValues> {
  title: string;
  subtitle?: string;
  onSubmit: (data: T) => Promise<void> | void;
  submitLabel: string;
  isPending?: boolean;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  schema: z.ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
}

export const FormWrapper = <T extends FieldValues>({
  title,
  subtitle,
  onSubmit,
  submitLabel,
  isPending: externalIsPending,
  footerContent,
  children,
  showBackButton,
  onBack,
  schema,
  defaultValues,
}: FormWrapperProps<T>) => {
  const [internalIsPending, setInternalIsPending] = React.useState(false);
  const isPending = externalIsPending ?? internalIsPending;

  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = async (data: T) => {
    try {
      setInternalIsPending(true);
      await onSubmit(data);
      methods.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setInternalIsPending(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 py-12 justify-center flex-1">
          {showBackButton && (
            <TouchableOpacity onPress={onBack} className="mb-8 self-start">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )}

          <Text className="text-3xl font-bold text-gray-900 mb-2">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 mb-8 text-lg">{subtitle}</Text>
          )}

          <View>{children}</View>

          <TouchableOpacity
            className={`bg-black py-4 rounded-xl items-center mt-10 ${
              isPending ? "opacity-70" : ""
            }`}
            onPress={methods.handleSubmit(handleFormSubmit)}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">
                {submitLabel}
              </Text>
            )}
          </TouchableOpacity>

          {footerContent && (
            <View className="flex-row justify-center mt-8">
              {footerContent}
            </View>
          )}
        </View>
      </ScrollView>
    </FormProvider>
  );
};
