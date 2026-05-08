import apiClient from "@/api/client";
import { UserCarResponse } from "@/types/car";

export const userService = {
  getUserCars: async (): Promise<UserCarResponse> => {
    const response = await apiClient.get("/customer/my-cars");

    return response.data;
  },
};
