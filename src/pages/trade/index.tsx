import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import CustomConnectedWallet from "../../components/app-buttons/CustomConnectedWallet";
import CustomConnectWallet from "../../components/app-buttons/CustomConnectWallet";
import { IconButton } from "../../components/app-buttons/IconButton";
import MarketDropdown, { type MarketOption } from "../../components/app-dropdown/MarketDropdown";
import { LikeIcon } from "../../components/app-icons/LikeIcon";
import { SettingsIcon } from "../../components/app-icons/SettingsIcon";
import { getDefaultMarket } from "../../constants/market-data";
import PositionTypeSelector, { type PositionType } from "../../features/PositionTypeSelector";
import TradingChart from "../../features/TradingChart";

const defaultMarket = getDefaultMarket();

const TradePage = () => {
    const { address } = useAccount();
    const [positionType, setPositionType] = useState<PositionType>("long");
    const [selectedMarket, setSelectedMarket] = useState<MarketOption>(defaultMarket);
    const [currentPrice, setCurrentPrice] = useState<number>(defaultMarket.initialPrice);

    const priceChange = useMemo(() => {
        if (!selectedMarket || currentPrice === 0) return 0;
        return ((currentPrice - selectedMarket.initialPrice) / selectedMarket.initialPrice) * 100;
    }, [selectedMarket, currentPrice]);

    const formatPrice = (price: number): string => {
        const parts = price.toFixed(2).split(".");
        return `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${parts[1]}`;
    };

    const formatPercentage = (change: number): string => {
        const sign = change >= 0 ? "+" : "";
        return `${sign}${change.toFixed(1)}%`;
    };

    const handlePriceUpdate = (newPrice: number) => {
        setCurrentPrice(newPrice);
    };

    const handleMarketChange = (market: MarketOption) => {
        setSelectedMarket(market);
        setCurrentPrice(market.initialPrice);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-3">
                <MarketDropdown onMarketChange={handleMarketChange} />
                {/* {address ? <CustomConnectedWallet address={address} /> : <ConnectButton />} */}
                {address ? <CustomConnectedWallet address={address} /> : <CustomConnectWallet />}
            </div>
            <div className="flex justify-between items-center p-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[#FFFFFF] text-3xl">{formatPrice(currentPrice)}</span>
                        {priceChange !== 0 && (
                            <span className={`text-lg ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>{formatPercentage(priceChange)}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <IconButton icon={<LikeIcon />} />
                    <IconButton icon={<SettingsIcon />} />
                </div>
            </div>
            <TradingChart key={selectedMarket.value} initialPrice={selectedMarket.initialPrice} onPriceUpdate={handlePriceUpdate} />
            <PositionTypeSelector value={positionType} onChange={setPositionType} />
        </div>
    );
};

export default TradePage;
