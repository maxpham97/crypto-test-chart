import type { IChartApi, IPriceLine, ISeriesApi, Time } from "lightweight-charts";
import { AreaSeries, createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

interface ChartData {
    time: Time;
    value: number;
}

interface TradingChartProps {
    initialPrice: number;
    onPriceUpdate?: (price: number) => void;
}

const TradingChart: React.FC<TradingChartProps> = ({ initialPrice, onPriceUpdate }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const areaSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
    const priceLineRef = useRef<IPriceLine | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number>(initialPrice);
    const [timeframe, setTimeframe] = useState<string>("1M");
    const lastPriceRef = useRef<number>(initialPrice);
    const onPriceUpdateRef = useRef(onPriceUpdate);

    // Keep callback ref up to date without causing re-renders
    useEffect(() => {
        onPriceUpdateRef.current = onPriceUpdate;
    }, [onPriceUpdate]);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Mock data generator
        const generateMockData = (): ChartData[] => {
            const data: ChartData[] = [];
            const basePrice = initialPrice;
            const now = Math.floor(Date.now() / 1000);
            const points = 100;
            let lastValue = basePrice;

            for (let i = 0; i < points; i++) {
                const time = (now - (points - i) * 60) as Time; // 1 minute intervals
                const randomChange = (Math.random() - 0.5) * (basePrice * 0.001); // Small random change relative to price
                const trend = (i / points) * (basePrice * 0.001); // Small upward trend
                const value = basePrice + trend + randomChange;
                lastValue = value;

                data.push({
                    time: time,
                    value: value,
                });
            }

            lastPriceRef.current = lastValue;
            return data;
        };

        // Create chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: "#1a1a1a" },
                textColor: "#d3d3d3",
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: "#2a2a2a",
            },
            rightPriceScale: {
                borderColor: "#2a2a2a",
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
            crosshair: {
                mode: 0,
                vertLine: {
                    visible: false,
                },
                horzLine: {
                    visible: false,
                },
            },
        });

        chartRef.current = chart;

        // Create area series for gradient background with line
        const areaSeries = chart.addSeries(AreaSeries, {
            lineColor: "#ECBD75",
            topColor: "rgba(236, 189, 117, 0.1)",
            bottomColor: "rgba(236, 189, 117, 0)",
            lineWidth: 2,
            crosshairMarkerVisible: false,
            priceLineVisible: false,
            lastValueVisible: false,
        });

        areaSeriesRef.current = areaSeries;

        // Set initial data
        const mockData = generateMockData();
        areaSeries.setData(mockData);

        // Update current price (initialize from data)
        if (mockData.length > 0) {
            const latestPrice = mockData[mockData.length - 1].value;
            lastPriceRef.current = latestPrice;
            // Set initial price state
            requestAnimationFrame(() => {
                setCurrentPrice(latestPrice);
                onPriceUpdateRef.current?.(latestPrice);
            });
        }

        // Add current price line
        priceLineRef.current = areaSeries.createPriceLine({
            price: lastPriceRef.current,
            color: "#00ff00",
            lineWidth: 1,
            lineStyle: 2, // Dashed line
            axisLabelVisible: true,
            title: "",
        });

        // Fit content
        chart.timeScale().fitContent();

        // Handle resize
        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener("resize", handleResize);

        // Real-time price update simulation
        const updateInterval = setInterval(() => {
            if (areaSeriesRef.current && chartRef.current) {
                const now = Math.floor(Date.now() / 1000) as Time;
                // Generate small random price change (percentage-based, max 0.1% change)
                const changePercent = (Math.random() - 0.5) * 0.2; // Max 0.1% up or down
                const change = lastPriceRef.current * (changePercent / 100);
                const newPrice = lastPriceRef.current + change;

                // Update chart with new price point
                const newDataPoint = {
                    time: now,
                    value: newPrice,
                };
                areaSeriesRef.current.update(newDataPoint);

                // Update current price state
                setCurrentPrice(newPrice);
                lastPriceRef.current = newPrice;
                onPriceUpdateRef.current?.(newPrice);

                // Remove old price line and create new one
                if (priceLineRef.current && areaSeriesRef.current) {
                    areaSeriesRef.current.removePriceLine(priceLineRef.current);
                }
                if (areaSeriesRef.current) {
                    priceLineRef.current = areaSeriesRef.current.createPriceLine({
                        price: newPrice,
                        color: "#00ff00",
                        lineWidth: 1,
                        lineStyle: 2,
                        axisLabelVisible: true,
                        title: "",
                    });
                }

                // Scroll chart to show latest data
                chart.timeScale().scrollToPosition(-1, false);
            }
        }, 2000); // Update every 3 seconds

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(updateInterval);
            chart.remove();
        };
    }, [initialPrice]);

    const timeframes = ["15S", "1M", "1H", "1D"];

    return (
        <div className="text-white p-4 w-full">
            {/* Header */}
            <div className="mb-4">
                {/* Chart */}
                <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden mb-4">
                    <div ref={chartContainerRef} className="w-full" style={{ minHeight: "400px" }} />

                    {/* Current price badge */}
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded text-sm font-semibold">
                        {currentPrice.toFixed(2)}
                    </div>
                </div>

                {/* Time controls */}
                <div className="w-full flex items-center justify-center gap-2 mb-4">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`w-full px-6 py-2 rounded-lg font-medium transition-all text-sm relative ${
                                timeframe === tf 
                                    ? "timeframe-button-active" 
                                    : "timeframe-button"
                            }`}>
                            {tf}
                        </button>
                    ))}
                </div>

                {/* Pagination dots */}
                <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-6 h-2 bg-yellow-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default TradingChart;
