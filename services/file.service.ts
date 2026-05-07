import { Platform } from "react-native";
import apiClient from "../api/client";

export const fileService = {
  uploadImage: async (uri: string): Promise<string> => {
    const formData = new FormData();
    
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("file", {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: filename,
      type,
    } as any);

    const response = await apiClient.post("/common/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Assuming the response returns the URL in response.data.url
    return response.data.url;
  },
};
