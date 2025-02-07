import React, { useEffect, useState, useRef, memo } from "react";

// This component is for embedding TradingView chart and handling WebSocket data updates
function TradingViewWidget() {
  const containerRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [ws, setWs] = useState(null);
  
  useEffect(() => {
    // Prevent multiple script injections
    if (!containerRef.current || containerRef.current.querySelector("script")) return;

    // TradingView script embedding
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "1100",
      height: "850",
      symbol: "ETHUSDT",  // Default symbol
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      withdateranges: true,
      range: "1D",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      support_host: "https://www.tradingview.com",
    });
    containerRef.current.appendChild(script);

    // Initialize WebSocket connection
    const socket = new WebSocket("ws://localhost:3001?symbol=BTCUSDT&interval=1m");

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setChartData((prevData) => [...prevData, newData]);  // Update chart with latest data
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(socket);

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      // You can dynamically update the TradingView chart using the WebSocket data
      // This requires integration with the TradingView API to update the chart in real-time
      // Example: Updating indicators with new data from WebSocket
    }
  }, [chartData]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{
        width: "1100px",   // Adjust width here
        height: "850px",   // Adjust height here
        border: "1px solid gray", // Border color
        margin: "2px",    // Margin around the container
        padding: "10px",
        borderRadius: "5px"   // Optional padding for some spacing inside the container
      }}
    >
      <div className="tradingview-widget-container__widget"></div>
      </div>
  );
}

export default memo(TradingViewWidget);
