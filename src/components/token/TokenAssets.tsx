import { View, Text, Image } from "react-native";
import React from "react";

const TokenAssets = ({ item }: any) => {
  return (
    <View
      style={{
        width: "100%",
        height: 52,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={{ width: 32, height: 32, borderRadius: 32 }}
          source={{ uri: item?.logo || 'https://i.postimg.cc/NfW3VfDW/coin-3665566.png' }}
        />
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontFamily: "800",
            marginLeft: 12,
          }}
        >
          {item?.name}
        </Text>
      </View>
      <Text style={{color:'black',fontWeight:'800',fontSize:16}}>{parseFloat(item?.balance_formatted)?.toFixed(3)}</Text>
    </View>
  );
};

export default TokenAssets;
