import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(4, "Year must be 4 digits").max(4, "Year must be 4 digits"),
  licensePlate: z.string().min(1, "License plate is required"),
  image: z.string().min(1, "Car image is required"),
});

export type CarFormData = z.infer<typeof carSchema>;
