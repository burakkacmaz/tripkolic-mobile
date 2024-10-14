import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

import { auth } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/home" as Href);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <SafeAreaView className="bg-stone-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-[85vh] px-4">
          <Image source={images.logoLarge} className="w-[250px] h-[84px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-xl font-bold">Yönetici hesabın için hemen giriş yap!</Text>
          </View>
          <View className="mt-5">
            <Text className="text-center">Bu uygulama Expo aracılığı ile React Native kullanarak kodlanmıştır.</Text>
            <Text className="text-center">Database olarak Firebase seçilmiştir.</Text>
          </View>
          <CustomButton title="Continue with Email" handlePress={() => router.push("/login" as Href)} containerStyles="w-full mt-7" />
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
