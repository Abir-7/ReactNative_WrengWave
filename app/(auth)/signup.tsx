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

  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate({ ...data, role });
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
      <FormInput label="Full Name" name="name" placeholder="John Doe" />

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
        name="confirmPassword"
        placeholder="••••••••"
        secureTextEntry
      />
    </FormWrapper>
  );
}
