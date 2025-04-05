import { View, Text, Image } from "react-native";
import React from "react";
import TransactionDetailsList from "../components/theme/TransactionDetailsList";
import { useAppKitAccount } from "@reown/appkit-ethers5-react-native";
import { trimAddress } from "../utils";
import Button from "../components/theme/Button";
import { useNavigation } from "@react-navigation/native";

const Success = ({route}:any) => {
    const { hash, to, amount, time, status, gas } = route.params;
    const {address}=useAppKitAccount();
    const navigation=useNavigation()
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        height:'100%'
      }}
    >
      <Image
        style={{ width: 300, height: 300 }}
        source={require("../assets/icons/success.png")}
      />
      <Text style={{marginVertical:40,width:'100%',textAlign:'center',fontSize:20,fontWeight:'800'}}>Transaction Successful</Text>
      <View style={{width:'90%',flexDirection:'column',alignItems:'center'}}>
        <TransactionDetailsList keyData={'From'} value={trimAddress(address ||'')}/>
        <TransactionDetailsList keyData={'To'} value={trimAddress(to || '')}/>
        <TransactionDetailsList keyData={'Hash'} value={trimAddress(hash || '')}/>
        <TransactionDetailsList keyData={'Amount'} value={amount}/>
        <TransactionDetailsList keyData={'Gas Used'} value={gas}/>
        <TransactionDetailsList keyData={'Chain'} value={"Polygon Amoy"}/>
        <Button text={'Go Back'} onClick={()=>{
navigation.goBack()
        }} style={{marginVertical:12,borderWidth:1,borderColor:'black'}}/>
      </View>
    </View>
  );
};

export default Success;
