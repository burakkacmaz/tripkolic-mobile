import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Navbar from "@/components/Navbar";

const reviews = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Navbar />
      </ScrollView>
    </SafeAreaView>
  );
};

export default reviews;
