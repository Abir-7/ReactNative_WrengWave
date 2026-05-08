import { UserCarResponse } from "@/types/car";
import { FlatList, Image, Text, View } from "react-native";

export default function CarSlider({
  user_cars,
}: {
  user_cars: UserCarResponse;
}) {
  return (
    <View>
      <Text className="text-xl font-semibold mb-2">My Cars</Text>

      <FlatList
        data={user_cars}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <View className="w-48 h-32 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-col ">
            <Image
              source={{ uri: `${item.image_url}` }}
              className="w-full h-20 "
              resizeMode="cover"
            />
            <View className="px-2 justify-center flex flex-col flex-1 h-auto">
              <Text className="font-medium">{item.brand}</Text>
              <Text className="font-medium text-sm text-gray-500">
                {item.brand}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
