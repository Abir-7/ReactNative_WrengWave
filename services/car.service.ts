import { AddCarResponse } from "@/types/car";
import apiClient from "../api/client";
import { CarFormData } from "../schemas/car.schema";

export const carService = {
  addCar: async (data: CarFormData): Promise<AddCarResponse> => {
    const payload = [
      {
        ...data,
        year: parseInt(data.year, 10),
      },
    ];
    const response = await apiClient.post<AddCarResponse>(
      "/customer/add-cars-data",
      payload,
    );
    return response.data;
  },
};
