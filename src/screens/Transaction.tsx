import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppKitButton,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitState,
} from "@reown/appkit-ethers5-react-native";
import Input from "../components/theme/Input";
import Button from "../components/theme/Button";
import { ethers } from "ethers";
import { promptForAuth } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Transaction = () => {
  const [amount, setAmount] = useState(0);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { walletProvider }: any = useAppKitProvider();
  const { address }: any = useAppKitAccount();
  const { selectedNetworkId } = useAppKitState();
  const [gasAmount, setGasAmount] = useState(0);
  const navigation = useNavigation();

  //console.log(address)

  const handleSendButton = async () => {
    if (amount <= 0) {
      return;
    }
    const auth = await promptForAuth();
    if (auth?.error || auth?.success == false) {
      return;
    }
    setLoading(true);
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner(address);
      const gas = await ethersProvider.getGasPrice();
      const balance = await ethersProvider.getBalance(address);
      const gasValue = parseInt(gas?._hex, 16) / 10 ** 18;
      const balanceInEth = parseInt(balance?._hex, 16) / 10 ** 18;
      if (gasValue * 21000 + amount > balanceInEth) {
        setLoading(false);
        //showFailure('Insufficient Funds')
        Alert.alert("Insufficient Funds or Gas");
        return;
      }

      const txData = {
        to: "0x3847F16cC7CCDFe47fCf81B39886F3cdf18751cA",
        value: ethers.utils.parseEther(amount?.toString()),
        data: "0x",
      };
      const tx = await signer.sendTransaction(txData);
      setHash(tx?.hash);
      if (tx?.hash) {
        await ethersProvider.waitForTransaction(tx?.hash).then((res) => {
          if (res.status == 1) {
            //successToast('Transaction Submitted')
            Alert.alert("Transaction Submitted");
            /*@ts-ignore*/
            navigation.navigate("Success", {
              hash: tx?.hash,
              to: "0x3847F16cC7CCDFe47fCf81B39886F3cdf18751cA",
              amount: amount,
              time: new Date(),
              status: "Success",
              gas: gasAmount,
            });
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      }
    } catch (err) {
      setLoading(false);
      console.log("err", err);
      Alert.alert("Transaction Error");
    }
  };

  const calculateGasFees = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const gas = await ethersProvider.getGasPrice();
    const gasValue = parseInt(gas?._hex, 16) / 10 ** 18;
    setGasAmount(gasValue * 21000);
  };

  useEffect(() => {
    calculateGasFees();
  }, []);

  return (
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
        <AppKitButton balance="show" />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "black",
          marginVertical: 16,
          marginTop: 30,
        }}
      >
        Deposit Amount
      </Text>
      <Input
        value={amount}
        setValue={setAmount}
        isNumber={true}
        style={{ width: "100%" }}
        placeHolder={"Enter Amount to deposit"}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 12,
        }}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "700" }}>
          Gas Price:{" "}
        </Text>
        <Text style={{ color: "black", fontSize: 16, fontWeight: "700" }}>
          {gasAmount} POL
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <ActivityIndicator size={"large"} color={"#b4f9f4"} />
        </View>
      ) : (
        <Button
          text={"Deposit"}
          onClick={() => {
            handleSendButton();
          }}
          style={{
            width: "100%",
            backgroundColor: "#b4f9f4",
            marginVertical: 40,
          }}
        />
      )}
    </View>
  );
};

export default Transaction;
