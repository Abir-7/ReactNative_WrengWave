import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useForgotPassword } from "@/hooks/useAuth";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schemas/auth.schema";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await forgotPasswordMutation.mutateAsync(data.email);
  };

  return (
    <FormWrapper<ForgotPasswordFormValues>
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a code to reset your password."
      onSubmit={onSubmit}
      submitLabel="Send Code"
      isPending={forgotPasswordMutation.isPending}
      schema={forgotPasswordSchema}
      defaultValues={{ email: "" }}
      showBackButton
      onBack={() => router.back()}
    >
      <FormInput
        label="Email Address"
        name="email"
        placeholder="example@mail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </FormWrapper>
  );
}
