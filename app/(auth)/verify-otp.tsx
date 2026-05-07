import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useVerifyUser } from "@/hooks/useAuth";
import { VerifyOtpFormValues, verifyOtpSchema } from "@/schemas/auth.schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email, type, user_id } = useLocalSearchParams<{
    email: string;
    type: "signup" | "forgot-password";
    user_id: string;
  }>();

  const verifyOtpMutation = useVerifyUser();

  const onSubmit = (data: VerifyOtpFormValues) => {
    verifyOtpMutation.mutate({
      user_id,
      code: data.otp,
      type: type,
    });
  };

  return (
    <FormWrapper<VerifyOtpFormValues>
      title="Verify Code"
      subtitle={`Enter the 4-digit code sent to ${email}`}
      onSubmit={onSubmit}
      submitLabel="Verify"
      isPending={verifyOtpMutation.isPending}
      schema={verifyOtpSchema}
      defaultValues={{ otp: "" }}
      showBackButton
      onBack={() => router.back()}
      footerContent={
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Didn&apos;t receive the code? </Text>
          <TouchableOpacity onPress={() => console.log("Resend OTP")}>
            <Text className="text-blue-600 font-bold">Resend</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <FormInput
        name="otp"
        placeholder="000000"
        placeholderTextColor="#9ca3af"
        keyboardType="number-pad"
        maxLength={6}
        inputClassName="text-center text-2xl font-bold tracking-widest"
      />
    </FormWrapper>
  );
}
