import { FormImageUploader } from "@/components/ui/form-image-uploader";
import { FormInput } from "@/components/ui/form-input";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useAddCar } from "@/hooks/useCar";
import { CarFormData, carSchema } from "@/schemas/car.schema";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCar() {
  const router = useRouter();
  const addCarMutation = useAddCar();

  const onSubmit = async (data: CarFormData) => {
    await addCarMutation.mutateAsync(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormWrapper
        title="Add New Car"
        subtitle="Enter your car details below"
        submitLabel="Add Car"
        schema={carSchema}
        isPending={addCarMutation.isPending}
        defaultValues={{
          brand: "",
          model: "",
          year: "",
          license_plate: "",
          tag_number: "",
          car_image_id: "",
        }}
        onSubmit={onSubmit}
        showBackButton
        onBack={() => router.back()}
      >
        <FormImageUploader name="car_image_id" label="Car Image" />

        <FormInput name="brand" label="Brand" placeholder="e.g. Toyota" />

        <FormInput name="model" label="Model" placeholder="e.g. Corolla" />

        <FormInput
          name="year"
          label="Year"
          placeholder="e.g. 2022"
          keyboardType="numeric"
        />

        <FormInput
          name="license_plate"
          label="License Plate"
          placeholder="e.g. ABC-1234"
          autoCapitalize="characters"
        />
        <FormInput
          name="tag_number"
          label="Tag Number"
          placeholder="e.g. ABC-1234"
          autoCapitalize="characters"
        />
      </FormWrapper>
    </SafeAreaView>
  );
}
