import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({ value, setValue, placeHolder, style,secureTextEntry,isNumber }: any) => {
  return (
    <TextInput
      value={value}
      placeholder={placeHolder}
      secureTextEntry={secureTextEntry?true:false}
      onChangeText={(text) => {
        setValue(text);
      }}
      keyboardType={isNumber?'numeric':'default'}
      placeholderTextColor={'rgba(0,0,0,0.2)'}
      style={{
        width: "80%",
        marginVertical: 12,
        borderRadius: 12,
        height: 52,
        paddingHorizontal:16,
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        fontWeight:'600',
        color:'black',
        ...style,
      }}
    />
  );
};

export default Input;
