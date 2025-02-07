import { useState } from "react";

export default function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("LONG"); // Default position
  const [orderType, setOrderType] = useState("Market"); // Default order type
  const [walletConnected, setWalletConnected] = useState(false); // Wallet state

  const handlePositionClick = (type) => {
    setPosition(type);
  };

  const handleOrderTypeClick = (type) => {
    setOrderType(type);
  };

  const handleWalletClick = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <div className={isOpen ? "border border-gray-500 rounded-md p-4 w-72" : "w-14 p-4"}>
      <button
        className="border border-gray-600 py-2 px-4 rounded mt-[-8px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>
      {isOpen && (
        <div className="w-[90%]">
          {/* LONG / SHORT Buttons */}
          <div className="flex justify-between">
            <button
              className={`py-1 px-3 rounded ${position === "LONG" ? "text-green-400 font-bold" : "text-gray-400"}`}
              onClick={() => handlePositionClick("LONG")}
            >
              LONG
            </button>
            <button
              className={`py-1 px-3 rounded ${position === "SHORT" ? "text-red-400 font-bold" : "text-gray-400"}`}
              onClick={() => handlePositionClick("SHORT")}
            >
              SHORT
            </button>
          </div>

          {/* Market / Limit / Stop Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              className={`py-1 px-3 rounded ${orderType === "Market" ? "bg-gray-700 text-white" : "text-gray-400"}`}
              onClick={() => handleOrderTypeClick("Market")}
            >
              Market
            </button>
            <button
              className={`py-1 px-3 rounded ${orderType === "Limit" ? "bg-gray-700 text-white" : "text-gray-400"}`}
              onClick={() => handleOrderTypeClick("Limit")}
            >
              Limit
            </button>
            <button
              className={`py-1 px-3 rounded ${orderType === "Stop" ? "bg-gray-700 text-white" : "text-gray-400"}`}
              onClick={() => handleOrderTypeClick("Stop")}
            >
              Stop
            </button>
          </div>

          {/* Order Details */}
          <div className="mt-4">
            <p>Available: $0.00</p>
            <input className="bg-gray-800 w-full p-2 mt-2 rounded" type="number" placeholder="0.00" />
          </div>

          <div className="mt-4">
            <button className="bg-gray-700 w-full py-2 rounded">Take Profit / Stop Loss</button>
          </div>

          {/* Responsive Wallet Button */}
          <button
            className={`w-full py-2 rounded mt-4 ${
              walletConnected ? "bg-green-500" : "bg-blue-400"
            }`}
            onClick={handleWalletClick}
          >
            {walletConnected ? "Wallet" : "Connect Wallet"}
          </button>

          {/* Order Summary */}
          <div className="mt-4">
            <p>Total Cost: $0.00</p>
            <p>Fill Price: -</p>
            <p>Price Impact: -</p>
            <p>Max Slippage: 5%</p>
            <p>Est. Liquidation Price: -</p>
          </div>

          {/* Account Info */}
          <div className="mt-4">
            <p>Account</p>
            <button className={`py-1 px-3 rounded ${walletConnected ? "bg-green-500" : "bg-blue-400"}`} onClick={handleWalletClick}>
              {walletConnected ? "Wallet" : "Connect"}
            </button>
            <p>Margin Ratio: 0.00%</p>
            <p>Maintenance Margin: -</p>
            <p>Account Equity (USDC): -</p>
            <p>Network: Synthetix BASE</p>
          </div>
        </div>
      )}
    </div>
  );
}