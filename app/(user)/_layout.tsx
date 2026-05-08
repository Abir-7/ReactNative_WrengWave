import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#2196f3", headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add_car"
        options={{
          href: null, // 👈 this removes it from the tab bar
        }}
      />
      <Tabs.Screen
        name="new_issue"
        options={{
          href: null, // 👈 this removes it from the tab bar
        }}
      />
    </Tabs>
  );
}
