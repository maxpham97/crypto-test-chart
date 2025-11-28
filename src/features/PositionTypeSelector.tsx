import React, { useState } from "react";

export type PositionType = "long" | "short";

interface PositionTypeSelectorProps {
    value?: PositionType;
    onChange?: (type: PositionType) => void;
    longLabel?: string;
    shortLabel?: string;
}

const PositionTypeSelector: React.FC<PositionTypeSelectorProps> = ({ value, onChange, longLabel = "Long", shortLabel = "Short" }) => {
    const [selectedType, setSelectedType] = useState<PositionType>(value || "long");

    const handleSelect = (type: PositionType) => {
        setSelectedType(type);
        onChange?.(type);
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 border-t-[0.5px] border-[#FFFFFF0D] rounded-2xl">
            {/* Header with details */}
            <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-gray-400 text-sm">Position details</span>
                <div className="flex items-center gap-3">
                    <button className="text-white text-sm px-4 py-2 rounded-lg bg-[#262626] hover:bg-[#222]">Margin $10</button>
                    <button className="text-white text-sm px-4 py-2 rounded-lg bg-[#262626] hover:bg-[#222]">Leverage 10x</button>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className="grid grid-cols-2 gap-2">
                {/* Long Button */}
                <button
                    onClick={() => handleSelect("long")}
                    className={`
            w-[180px] h-[36px]
            flex items-center justify-center
            py-4 rounded-lg font-semibold text-base transition-all
            text-[#97FCA6]
            ${selectedType === "long" ? "bg-[#97FCA61A] text-[#97FCA6] shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}
          `}>
                    {longLabel}
                </button>

                {/* Short Button */}
                <button
                    onClick={() => handleSelect("short")}
                    className={`
            w-[180px] h-[36px]
            flex items-center justify-center
            py-4 rounded-lg font-semibold text-base transition-all
            bg-[#FF5F5F1A]
            text-[#FF583A]`}>
                    {shortLabel}
                </button>
            </div>
        </div>
    );
};

export default PositionTypeSelector;
