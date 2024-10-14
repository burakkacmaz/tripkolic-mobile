import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";

const Bookings = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Navbar />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;
