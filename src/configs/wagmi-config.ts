import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "My App",
    projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
});
