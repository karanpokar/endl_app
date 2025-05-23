import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  AppKitButton,
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit-ethers5-react-native";
import WalletPlaceHolder from "../components/theme/WalletPlaceHolder";
import { useAsset } from "../context/useAssetContext";
import TokenAssets from "../components/token/TokenAssets";
import { useNavigation } from "@react-navigation/native";
import TransactionHistory from "./TransactionHistory";

const HomeScreen = () => {
  const { address, isConnected,chainId } = useAppKitAccount();
  const { tokens }: any = useAsset();
  const navigation = useNavigation();
  console.log('ChainId',chainId)
  //const { switchChain } = useAppKit();

  // Example usage
  


  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            padding: 24,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "black",
              borderRadius: 12,
              padding: 12,
            }}
          >
            {chainId!==80002 && <Text style={{color:'red',fontSize:16,marginVertical:12}}>Please switch to Polygon Amoy on your wallet</Text>}
            <AppKitButton balance="show" />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
              width: "100%",
            }}
          >
            <TouchableOpacity
            onPress={()=>{
              /*@ts-ignore*/
              navigation.navigate('Transaction')
            }}
              style={{
                height: 52,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "rgba(0,0,0,0.6)",
                borderWidth: 0.5,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "800", textAlign: "center" }}
              >
                Deposit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 52,
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "rgba(0,0,0,0.6)",
                borderWidth: 0.5,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "800", textAlign: "center" }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height:1,marginVertical:16,width:'100%',backgroundColor:'rgba(0,0,0,0.1)'}}/>
          {tokens?.map((item:any,index:any)=>(
            <TokenAssets key={index} item={item}/>
          ))}
          <View style={{height:1,marginVertical:16,width:'100%',backgroundColor:'rgba(0,0,0,0.1)'}}/>
          <TransactionHistory/>
        </View>
      ) : (
        <WalletPlaceHolder />
      )}
    </View>
  );
};

export default HomeScreen;
