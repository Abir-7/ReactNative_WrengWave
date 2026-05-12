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
    <View
      style={{
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#f3f4f6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#111827",
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
        }}
      >
        Location
      </Text>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: "#e5e7eb" }} />

      {/* Address Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 14,
          gap: 12,
        }}
      >
        <Ionicons name="location-sharp" size={22} color="#6b7280" />

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ flex: 1, fontSize: 15, color: "#1f2937" }}
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
      <View style={{ height: 1, backgroundColor: "#e5e7eb" }} />

      {/* Use Current Location */}
      <TouchableOpacity
        onPress={handleUseCurrentLocation}
        disabled={loading}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 14,
          gap: 10,
        }}
        accessibilityLabel="Use current location"
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: "#2563eb",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={loading ? "reload" : "locate"}
            size={14}
            color="#2563eb"
          />
        </View>

        <Text style={{ fontSize: 14, fontWeight: "500", color: "#2563eb" }}>
          {loading ? "Fetching location…" : "Use current location"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
