import "@walletconnect/react-native-compat";
import "@ethersproject/shims";
import React from "react";
import {
  createAppKit,
  defaultConfig,
  AppKit,
} from "@reown/appkit-ethers5-react-native";

const projectId = "2a7099b580ed18eee8cc6a30566cdecd";

const metadata = {
  name: "Endl App",
  description: "Endl App",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "endl://",
  },
};

const config = defaultConfig({ metadata });

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygonamoy = {
  chainId: 80002,
  name: "Polygon Amoy",
  currency: "POL",
  explorerUrl: "https://amoy.polygonscan.com",
  rpcUrl: "https://polygon-amoy.g.alchemy.com/v2/Q19FeX_OTRO0E9xhDAr5rr5vMwCgakyt",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const chains = [mainnet, polygon,polygonamoy];

createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true,
});

export default function WalletProvider({ children }: any) {
  return (
    <>
      {children}
      <AppKit />
    </>
  );
}
