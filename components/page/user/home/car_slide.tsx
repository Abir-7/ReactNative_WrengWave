import { FlatList, Text, View } from "react-native";

const cars = [
  { id: "1", name: "Toyota" },
  { id: "2", name: "BMW" },
  { id: "3", name: "Audi" },
];

export default function CarSlider() {
  return (
    <View>
      <Text className="text-lg font-semibold mb-2">My Cars</Text>

      <FlatList
        data={cars}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <View className="w-48 h-32 bg-gray-200 rounded-xl items-center justify-center">
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
