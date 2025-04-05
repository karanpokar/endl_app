import {
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit-ethers5-react-native";
import axios from "axios";
import { ethers } from "ethers";
import React, { createContext, useContext, useState, useEffect } from "react";
/*@ts-ignore*/
const AssetContext = createContext();

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens]: any = useState(null);
  const { address } = useAppKitAccount();
  const { walletProvider }: any = useAppKitProvider();

  const fetchAssets = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const balance = await ethersProvider.getBalance(address || "");
    const balInEth = parseInt(balance?._hex, 16) / 10 ** 18;
    let token = {
      token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      symbol: "POL",
      name: "POL",
      logo: "https://cdn.moralis.io/polygon/0x.png",
      thumbnail: "https://cdn.moralis.io/polygon/0x_thumb.png",
      decimals: 18,
      balance: (balInEth * 10 ** 18)?.toString(),
      possible_spam: false,
      verified_contract: true,
      total_supply: null,
      total_supply_formatted: null,
      percentage_relative_to_total_supply: null,
      security_score: null,
      balance_formatted: balInEth?.toString(),
      usd_price: 0,
      usd_price_24hr_percent_change: 0,
      usd_price_24hr_usd_change: 0,
      usd_value: 0,
      usd_value_24hr_usd_change: 0,
      native_token: true,
      portfolio_percentage: 0,
    };
    setTokens([token]);
  };

  useEffect(() => {
    if (address) fetchAssets();
  }, [address]);

  return (
    <AssetContext.Provider
      value={{
        tokens,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => useContext(AssetContext);
