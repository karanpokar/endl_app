import { View, Text, Image } from "react-native";
import React from "react";
import { AppKitButton } from "@reown/appkit-ethers5-react-native";

const WalletPlaceHolder = () => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white",alignItems:'center',justifyContent:'center' }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/wallet.webp")}
      />
      <AppKitButton label="Connect Wallet"/>
    </View>
  );
};

export default WalletPlaceHolder;
