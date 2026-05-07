import { FormImage } from "@/components/ui/form-image";
import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { CarFormData, carSchema } from "@/schemas/car.schema";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCar() {
  const router = useRouter();

  const onSubmit = (data: CarFormData) => {
    console.log("Form Data:", data);
    // Handle form submission (e.g., call an API)
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormWrapper
        title="Add New Car"
        subtitle="Enter your car details below"
        submitLabel="Add Car"
        schema={carSchema}
        defaultValues={{
          brand: "",
          model: "",
          year: "",
          licensePlate: "",
          image: "",
        }}
        onSubmit={onSubmit}
        showBackButton
        onBack={() => router.back()}
      >
        <FormImage name="image" label="Car Image" />
        
        <FormInput
          name="brand"
          label="Brand"
          placeholder="e.g. Toyota"
        />
        
        <FormInput
          name="model"
          label="Model"
          placeholder="e.g. Corolla"
        />
        
        <FormInput
          name="year"
          label="Year"
          placeholder="e.g. 2022"
          keyboardType="numeric"
        />
        
        <FormInput
          name="licensePlate"
          label="License Plate"
          placeholder="e.g. ABC-1234"
          autoCapitalize="characters"
        />
      </FormWrapper>
    </SafeAreaView>
  );
}
