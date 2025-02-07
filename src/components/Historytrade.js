import { useState, useEffect, useRef } from "react";

export default function HistoryTrade() {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(null);
  const ws = useRef(null); // WebSocket reference

  useEffect(() => {
    const symbol = "btcusdt";
    ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected.");
      setError(null);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const newTrade = {
          amount: data.q ? parseFloat(data.q).toFixed(4) : "N/A",
          price: data.p ? `$${parseFloat(data.p).toFixed(2)}` : "N/A",
          time: new Date(data.T).toLocaleTimeString(),
          color: data.m ? "text-red-400" : "text-green-400",
        };

        setTrades((prevTrades) => [newTrade, ...prevTrades.slice(0, 21)]); // Add new trade at the start

      } catch (err) {
        console.error("❌ WebSocket Error:", err);
        setError("Error parsing trade data.");
      }
    };

    ws.current.onerror = (err) => {
      console.error("❌ WebSocket Connection Error:", err);
      setError("WebSocket connection error.");
    };

    ws.current.onclose = () => {
      console.log("🔴 WebSocket Disconnected. Attempting to reconnect...");
      setError("WebSocket disconnected. Reconnecting...");
      setTimeout(() => {
        if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
          ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
        }
      }, 3000); // Reconnect after 3 seconds
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="p-3 w-[260px] border border-gray-500 rounded-md">
      <div className="flex justify-between pb-2 text-gray-500">
        <span>Amount</span>
        <span>Price</span>
        <span>Time</span>
      </div>
      <div className="mt-2 space-y-2">
        {error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : trades.length > 0 ? (
          trades.map((trade, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className={trade.color}>{trade.amount}</span>
              <span>{trade.price}</span>
              <span className="text-gray-400">{trade.time}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">Waiting for trades...</p>
        )}
      </div>
    </div>
  );
}
