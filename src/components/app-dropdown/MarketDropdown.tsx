import { useState } from "react";

export type MarketOption = {
    icon: string;
    label: string;
    value: string;
    leverage?: string;
    initialPrice: number;
};

import { marketMockData } from "../../constants/market-data";

const mockData = marketMockData;

interface MarketDropdownProps {
    onMarketChange?: (market: MarketOption) => void;
}

const MarketDropdown: React.FC<MarketDropdownProps> = ({ onMarketChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<MarketOption>(mockData[0]);

    return (
        <div className="relative w-[240px]">
            {/* Selected item */}
            <button
                className="w-full flex items-center justify-between bg-[#222222] hover:bg-[#222] border border-[#333] px-4 py-2 rounded-xl text-sm text-white"
                onClick={() => setOpen((p) => !p)}>
                <div className="flex items-center gap-2">
                    {/* Icon placeholder */}
                    <div className="w-5 h-5 bg-orange-400 rounded-full" />

                    <span>{selected.label}</span>

                    {selected.leverage && <span className="text-gray-400 text-xs">{selected.leverage}</span>}
                </div>

                <span className="text-gray-400">▼</span>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute mt-2 w-full bg-[#1A1A1A] border border-[#333] rounded-xl shadow-xl z-10 p-1">
                    {mockData.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => {
                                setSelected(item);
                                setOpen(false);
                                onMarketChange?.(item);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-white hover:bg-[#2A2A2A]">
                            <div className="w-5 h-5 bg-orange-400 rounded-full" />
                            <span>{item.label}</span>
                            {item.leverage && <span className="text-gray-400 text-xs">{item.leverage}</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MarketDropdown;
