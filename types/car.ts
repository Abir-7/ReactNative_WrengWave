export interface CarResponse {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  tag_number: string;
  car_image_id: string;
  created_at: string;
  updated_at: string;
}

export type AddCarResponse = CarResponse[];
