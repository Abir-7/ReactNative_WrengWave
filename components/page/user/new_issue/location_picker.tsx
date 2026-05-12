import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface LocationPickerProps {
  initialAddress?: string;
  onAddressChange?: (address: string) => void;
  onEditPress?: () => void;
  onUseCurrentLocation?: (coords: {
    latitude: number;
    longitude: number;
  }) => void;
}

export default function LocationPicker({
  initialAddress = "123 Market St, Suite 450",
  onAddressChange,
  onEditPress,
  onUseCurrentLocation,
}: LocationPickerProps) {
  const [address, setAddress] = useState(initialAddress);
  const [loading, setLoading] = useState(false);

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (place) {
        const formatted = [
          place.streetNumber,
          place.street,
          place.city,
          place.region,
        ]
          .filter(Boolean)
          .join(", ");
        setAddress(formatted);
        onAddressChange?.(formatted);
      }

      onUseCurrentLocation?.({ latitude, longitude });
    } catch {
      Alert.alert("Error", "Could not retrieve your location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white mx-4 mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Title */}
      <Text className="text-base font-semibold text-gray-900 px-4 pt-4 pb-3">
        Location
      </Text>

      {/* Divider */}
      <View className="h-[1px] bg-gray-200" />

      {/* Address Row */}
      <View className="flex-row items-center px-4 py-3.5 gap-3">
        <Ionicons name="location-sharp" size={22} color="#6b7280" />

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="flex-1 text-[15px] text-gray-800"
        >
          {address}
        </Text>

        <TouchableOpacity
          onPress={onEditPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Edit address"
        >
          <MaterialIcons name="edit" size={19} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-200" />

      {/* Use Current Location */}
      <TouchableOpacity
        onPress={handleUseCurrentLocation}
        disabled={loading}
        className="flex-row items-center justify-center py-3.5 gap-2.5"
        accessibilityLabel="Use current location"
      >
        <View className="w-7 h-7 rounded-full border-2 border-blue-600 items-center justify-center">
          <Ionicons
            name={loading ? "reload" : "locate"}
            size={14}
            color="#2563eb"
          />
        </View>

        <Text className="text-sm font-medium text-blue-600">
          {loading ? "Fetching location…" : "Use current location"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
