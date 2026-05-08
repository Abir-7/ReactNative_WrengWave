import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .string()
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits"),
  license_plate: z.string().min(1, "License plate is required"),
  tag_number: z.string().min(1, "Tag number is required"),
  car_image_id: z.string().min(1, "Car image is required"),
});

export type CarFormData = z.infer<typeof carSchema>;
