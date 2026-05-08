import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useSignup } from "@/hooks/useAuth";
import { SignupFormValues, signupSchema } from "@/schemas/auth.schema";
import { UserRole } from "@/store/auth.store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function SignupScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: UserRole }>();

  const signupMutation = useSignup();

  const onSubmit = async (data: SignupFormValues) => {
    const { confirm_password, full_name, ...rest } = data;
    await signupMutation.mutateAsync({ ...rest, name: full_name, role });
  };

  return (
    <FormWrapper<SignupFormValues>
      title="Create Account"
      subtitle={`Sign up as a ${role}`}
      submitLabel="Sign Up"
      isPending={signupMutation.isPending}
      onSubmit={onSubmit}
      schema={signupSchema}
      defaultValues={{
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      showBackButton
      onBack={() => router.back()}
      footerContent={
        <>
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text className="text-blue-600 font-bold">Login</Text>
          </TouchableOpacity>
        </>
      }
    >
      <FormInput label="Full Name" name="full_name" placeholder="John Doe" />

      <FormInput
        label="Email Address"
        name="email"
        placeholder="example@mail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        label="Password"
        name="password"
        placeholder="••••••••"
        secureTextEntry
      />

      <FormInput
        label="Confirm Password"
        name="confirm_password"
        placeholder="••••••••"
        secureTextEntry
      />
    </FormWrapper>
  );
}
