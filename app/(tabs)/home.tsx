import { View, Text, SafeAreaView, Image, ActivityIndicator, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { db } from "../firebaseConfig";
import { images } from "@/constants";
import Navbar from "@/components/Navbar";

interface User {
  profileImage: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  phone?: string;
}

interface VacationProgram {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
}

const Home = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        // Use onSnapshot for real-time updates
        const unsubscribe = onSnapshot(userDoc, (userData) => {
          if (userData.exists()) {
            setUserInfo(userData.data() as User);
          } else {
            console.error("No user data found");
          }
          setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } else {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  const vacationPrograms: VacationProgram[] = [
    {
      id: "1",
      title: "Tayland: Plaj Tatili",
      location: "Phuket, Tayland",
      price: "$1500",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/47/e3/54/img-20191212-164919-3.jpg?w=1100&h=-1&s=1",
    },
    {
      id: "2",
      title: "Amerika: New York Keşfi",
      location: "New York, ABD",
      price: "$2000",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/97/38/c7/one-of-my-favourite-places.jpg?w=1100&h=-1&s=1",
    },
  ];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <Navbar />
      <View className="mt-2 px-2">
        <FlatList
          data={vacationPrograms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border p-2 mb-4 rounded-md">
              <Image source={{ uri: item.image }} style={{ width: "100%", height: 200, borderRadius: 10 }} />
              <Text className="text-lg font-bold mt-2">{item.title}</Text>
              <Text className="text-gray-600">{item.location}</Text>
              <Text className="text-red-500 font-semibold">{item.price}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
