import { createConfig, http } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

import {
  tokenPocketWallet,
  walletConnectWallet,
  metaMaskWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const projectId = "45a029651f37ec8e01c2e486810e6f3e";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [trustWallet,walletConnectWallet, metaMaskWallet, tokenPocketWallet],
    },
  ],
  {
    appName: "eagles",
    projectId: "45a029651f37ec8e01c2e486810e6f3e",
  }
);
export const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
});
