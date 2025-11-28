import type { MarketOption } from "../components/app-dropdown/MarketDropdown";

export const marketMockData: MarketOption[] = [
    {
        icon: "",
        label: "BTCDEGEN/USDC",
        value: "btcdegen-usdc",
        leverage: "100x",
        initialPrice: 113610.07,
    },
    {
        icon: "",
        label: "ETH/USDC",
        value: "eth-usdc",
        leverage: "50x",
        initialPrice: 3500.25,
    },
];

export const getDefaultMarket = (): MarketOption => marketMockData[0];

