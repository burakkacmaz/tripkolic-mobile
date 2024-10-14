import { View, Text, SafeAreaView, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CustomButton from "@/components/CustomButton"; // Adjust the import path accordingly
import FormField from "@/components/FormField"; // Adjust the import path accordingly
import Navbar from "@/components/Navbar";
import { router } from "expo-router";

interface User {
  profileImage: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  phone?: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User> | null>(null);

  useEffect(() => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDoc, (userData) => {
        if (userData.exists()) {
          const data = userData.data() as User;
          setUserInfo(data);
          setFormData(data);
          setLoading(false);
        } else {
          console.error("No user data found");
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChangeText = (key: keyof User, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const handleSave = async () => {
    if (user && formData) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, formData);

        setUserInfo((prev) => (prev ? { ...prev, ...formData } : null));
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Navbar />
        <View className="p-2">
          <Text className="text-lg font-bold mb-5">Information</Text>
          <View className="items-center mb-4">{userInfo?.profileImage ? <Image source={{ uri: userInfo.profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} /> : <Text>No profile image available</Text>}</View>

          <View className="flex-1">
            {isEditing ? (
              <>
                <FormField title="First Name" value={formData?.firstName || ""} handleChangeText={(text) => handleChangeText("firstName", text)} />
                <FormField title="Last Name" value={formData?.lastName || ""} handleChangeText={(text) => handleChangeText("lastName", text)} />
                <FormField title="Country" value={formData?.country || ""} handleChangeText={(text) => handleChangeText("country", text)} />
                <FormField title="Date of Birth" value={formData?.dateOfBirth || ""} handleChangeText={(text) => handleChangeText("dateOfBirth", text)} />
                <FormField title="Passport Number" value={formData?.passportNumber || ""} handleChangeText={(text) => handleChangeText("passportNumber", text)} />
                <FormField title="Phone Number" value={formData?.phone || ""} handleChangeText={(text) => handleChangeText("phone", text)} />
                <View className="flex flex-row mt-7 space-x-10">
                  <CustomButton containerStyles="flex-1" title="Vazgeç" handlePress={handleCancel} />
                  <CustomButton containerStyles="flex-1" title="Save" handlePress={handleSave} />
                </View>
              </>
            ) : (
              <>
                <View className="flex flex-col">
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">First Name:</Text>
                    <Text className="text-lg">{userInfo?.firstName}</Text>
                  </View>
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">Last Name:</Text>
                    <Text className="text-lg">{userInfo?.lastName}</Text>
                  </View>
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">Country:</Text>
                    <Text className="text-lg">{userInfo?.country}</Text>
                  </View>
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">Birthday:</Text>
                    <Text className="text-lg">{userInfo?.dateOfBirth}</Text>
                  </View>
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">Passport Number:</Text>
                    <Text className="text-lg">{userInfo?.passportNumber || "N/A"}</Text>
                  </View>
                  <View className="flex-row space-x-2 text-center items-center mt-2">
                    <Text className="text-lg font-bold">Phone Number:</Text>
                    <Text className="text-lg">{userInfo?.phone || "N/A"}</Text>
                  </View>
                </View>
                <CustomButton containerStyles="mt-5" title="Edit" handlePress={handleEditToggle} />
                <CustomButton containerStyles="bg-red-600 mt-5" title="Çıkış" handlePress={handleLogout} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
