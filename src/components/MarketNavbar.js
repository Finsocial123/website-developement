import { useState, useEffect } from "react";

export default function MarketNavbar() {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);
  const symbol = "ETHUSDT";
  const interval = "5m";

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }

        const data = await response.json();
        const latestCandle = data[data.length - 1];
        
        setMarketData({
          open: parseFloat(latestCandle[1]),
          high: parseFloat(latestCandle[2]),
          low: parseFloat(latestCandle[3]),
          close: parseFloat(latestCandle[4]),
          volume: parseFloat(latestCandle[5]),
        });
      } catch (err) {
        console.error("❌ Error fetching market data:", err);
        setError("Failed to fetch market data.");
      }
    };

    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-3 flex items-center space-x-8 w-full border border-gray-500 rounded-md">
      {error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : marketData ? (
        <div className="flex items-center space-x-4">
          <span className="text-yellow-400">★</span>
          <span>ETH</span>
          <span className={marketData.close >= marketData.open ? "text-green-400" : "text-red-400"}>
            ${marketData.close?.toFixed(2) || "N/A"}
          </span>
          <span>High:</span>
          <span className="text-green-400">${marketData.high?.toFixed(2) || "N/A"}</span>
          <span>Low:</span>
          <span className="text-red-400">${marketData.low?.toFixed(2) || "N/A"}</span>
          <span>Open:</span>
          <span className="text-blue-400">${marketData.open?.toFixed(2) || "N/A"}</span>
          <span>Volume:</span>
          <span className="text-purple-400">{marketData.volume ? marketData.volume.toFixed(2) : "N/A"}</span>
          <span>Change %:</span>
          <span className={marketData.close >= marketData.open ? "text-green-400" : "text-red-400"}>
            {marketData.open && marketData.close ? (((marketData.close - marketData.open) / marketData.open * 100).toFixed(2) + "%") : "N/A"}
          </span>
        </div>
      ) : (
        <p className="text-gray-400">Loading market data...</p>
      )}
    </div>
  );
}
