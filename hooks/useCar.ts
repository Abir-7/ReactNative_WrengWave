import { CarFormData } from "@/schemas/car.schema";
import { carService } from "@/services/car.service";
import { userService } from "@/services/user.service";
import { AddCarResponse } from "@/types/car";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function useAddCar() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CarFormData): Promise<AddCarResponse> =>
      carService.addCar(data),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Car added successfully",
      });

      // Invalidate cars list query if you have one (e.g., ['cars'])
      queryClient.invalidateQueries({ queryKey: ["cars"] });

      router.back();
    },
    onError: (error: any) => {
      console.error("Add Car failed:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to add car",
      });
    },
  });
}

export const useGetUserCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: userService.getUserCars,
  });
};
