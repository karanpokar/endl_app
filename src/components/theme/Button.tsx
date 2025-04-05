import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ text, onClick, style }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      activeOpacity={0.5}
      style={{ width: "80%", height: 54, borderRadius: 12,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white', ...style }}
    >
      <Text style={{ color: "black", fontSize: 16,textAlign:'center',fontWeight:'700' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
