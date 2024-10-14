import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string; // Optional string class for Tailwind styles
  textStyles?: string; // Optional string class for Tailwind styles
  isLoading?: boolean; // Optional boolean for loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles = "", textStyles = "", isLoading = false }) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-[#FFA001] rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`} disabled={isLoading}>
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
