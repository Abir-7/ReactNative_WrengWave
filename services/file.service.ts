import { Platform } from "react-native";
import apiClient from "../api/client";

export const fileService = {
  uploadImage: async (
    uri: string,
  ): Promise<{ image_id: string; uri: string }> => {
    const formData = new FormData();

    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("image", {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: filename,
      type,
    } as any);

    const response = await apiClient.post(
      "/customer/add-cars-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // Assuming the response returns the URL in response.data.url
    return { image_id: response.data.image_data_id, uri: response.data.uri };
  },
};
