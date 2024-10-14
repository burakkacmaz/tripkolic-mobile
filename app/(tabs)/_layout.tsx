import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "@/constants";
import { StatusBar } from "expo-status-bar";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className="text-xs" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: "#FFA001", tabBarInactiveTintColor: "#CDCDE0", tabBarStyle: { backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#dacece", paddingTop: 20, height: 84 } }}>
        <Tabs.Screen name="home" options={{ title: "Home", headerShown: false, tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused} /> }} />
        <Tabs.Screen name="bookings" options={{ title: "Bookings", headerShown: false, tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.bookmark} color={color} name="Bookings" focused={focused} /> }} />
        <Tabs.Screen name="reviews" options={{ title: "Reviews", headerShown: false, tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.eye} color={color} name="Reviews" focused={focused} /> }} />
        <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false, tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} /> }} />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
};

export default TabsLayout;
