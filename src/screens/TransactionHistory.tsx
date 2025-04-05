import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit-ethers5-react-native";
import { fetchTransfersFrom, fetchTransfersTo } from "../utils";

const TransactionHistory = () => {
  const { address } = useAppKitAccount();
  const [history, setHistory] = useState([]);

  const fetchCombinedTransfers = async (address: string) => {
    const [fromTransfers, toTransfers] = await Promise.all([
      fetchTransfersFrom(address),
      fetchTransfersTo(address),
    ]);

    let from = fromTransfers?.map((item: any, index: any) => {
      return { ...item, type: "Sent" };
    });
    let to = toTransfers?.map((item: any, index: any) => {
      return { ...item, type: "Receive" };
    });
    const allTransfers = [...from, ...to];
    //console.log('History',history)
    // Sort by block number descending (latest first)
    allTransfers.sort(
      (a, b) => parseInt(b.blockNum, 16) - parseInt(a.blockNum, 16)
    );
    /*@ts-ignore*/
    setHistory(allTransfers);

    return allTransfers;
  };

  useEffect(() => {
    if (address) {
      fetchCombinedTransfers(address);
      //setHistory(data);
    }
  }, [address]);

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          color: "black",
          fontSize: 18,
          marginVertical: 12,
          fontWeight: "800",
        }}
      >
        Transaction History
      </Text>
      {history?.map((item: any, index) => (
        <TouchableOpacity
        onPress={async()=>{
            await Linking.openURL(`https://amoy.polygonscan.com/tx/${item?.hash}`)
        }}
          key={item?.hash}
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            borderRadius: 12,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            height: 52,
            marginVertical: 12,
          }}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
            {item?.type} {item?.value} {item?.asset}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TransactionHistory;
