import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useLogin } from "@/hooks/useAuth";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <FormWrapper<LoginFormValues>
      title="Login"
      submitLabel="Login"
      isPending={loginMutation.isPending}
      onSubmit={onSubmit}
      schema={loginSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      footerContent={
        <>
          <Text className="text-gray-600">Don&apos;t have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/role-selection")}
          >
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </>
      }
    >
      <FormInput
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput name="password" placeholder="Password" secureTextEntry />

      <TouchableOpacity
        className="self-end -mt-2"
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text className="text-blue-600 font-medium">Forgot Password?</Text>
      </TouchableOpacity>
    </FormWrapper>
  );
}
