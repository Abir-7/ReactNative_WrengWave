import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useResetPassword } from "@/hooks/useAuth";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/schemas/auth.schema";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();

  const resetPasswordMutation = useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate({
      email,
      otp,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
  };

  return (
    <FormWrapper<ResetPasswordFormValues>
      title="New Password"
      subtitle="Create a new, strong password for your account."
      onSubmit={onSubmit}
      submitLabel="Reset Password"
      isPending={resetPasswordMutation.isPending}
      schema={resetPasswordSchema}
      defaultValues={{
        password: "",
        confirmPassword: "",
      }}
      showBackButton
      onBack={() => router.back()}
    >
      <FormInput
        label="New Password"
        name="password"
        placeholder="••••••••"
        secureTextEntry
      />

      <FormInput
        label="Confirm New Password"
        name="confirmPassword"
        placeholder="••••••••"
        secureTextEntry
      />
    </FormWrapper>
  );
}
