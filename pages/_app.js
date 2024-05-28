import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, opBNBTestnet, bscTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import Navbar from "../components/navbar";
 import ProjectName from "../components/projectname";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "95f8ce26a83baf6d9b6db95a07e082a1",
  chains: [opBNBTestnet, bscTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider> 
                     <Component {...pageProps} />
                     <Navbar />
                     <ProjectName />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
  );
}

export default MyApp;
