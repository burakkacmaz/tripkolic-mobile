import { useAuth } from "@/app/AuthContext";
import { db } from "@/app/firebaseConfig";
import { images } from "@/constants";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

interface User {
  profileImage: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  phone?: string;
}

export default function Navbar() {
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

  return (
    <View className="flex-row space-x-4 justify-between items-center text-center p-4 border-b ">
      <View>
        <Image source={images.logoLarge} resizeMode="contain" className="w-[100px]" />
      </View>
      <View className="flex-row space-x-4">
        <View className="flex flex-row space-x-1 text-center items-center justify-center">
          <Text className="text-lg font-bold">{userInfo?.firstName}</Text>
          <Text className="text-lg font-bold">{userInfo?.lastName}</Text>
        </View>
        {userInfo?.profileImage ? <Image source={{ uri: userInfo.profileImage }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} /> : <Image source={images.profile} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />}
      </View>
    </View>
  );
}
