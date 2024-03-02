import React from 'react'
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = "35d3202e2ddd07c07087b3db25051ad3";

const metadata = {
  name: "Culdesac",
  description: "Culdesac Club",
  url: "https://culdesac.club/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia, mainnet] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});


createWeb3Modal({
  wagmiConfig: config,
  projectId,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
