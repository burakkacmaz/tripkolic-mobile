import { View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import { Href, useRouter } from "expo-router";
import { auth } from "@/app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SetStateAction, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home" as Href);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView className="h-full bg-stone-100">
      <ScrollView>
        <View className="w-full justify-center min-h-[65vh] px-4 my-6">
          <View className="justify-center items-center">
            <Image source={images.logoLarge} resizeMode="contain" className="w-[150px] h-[45px]" />
          </View>
          <Text className="text-xl text-black mt-10 font-semibold">Login to Tripkolic Marketing Account</Text>
          <FormField title="Email" value={email} handleChangeText={(e: SetStateAction<string>) => setEmail(e)} otherStyles="mt-7" />
          <FormField title="Password" value={password} handleChangeText={(e: SetStateAction<string>) => setPassword(e)} otherStyles="mt-7" />

          <CustomButton title="Login" handlePress={handleLogin} containerStyles="mt-7" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
