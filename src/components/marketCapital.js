import React from "react";
import { useNavigate } from "react-router-dom";
import { Bitcoin, EclipseIcon as Ethereum, DollarSign, Coins, Sun, Dog, Activity, Zap, Triangle } from 'lucide-react'
import Header from "./header";
import Sidebar from "./sideBar";
import { useState } from "react";
import CryptoPrices from "./cryptoPrices";



const MarketCapital = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
 

  const cryptoData = [
    {
      name: "BTC",
      fullName: "Bitcoin",
      price: "$96,584.43",
      change: "+5.41%",
      volume: "$72.55B",
      marketCap: "$1,908.58B",
      changeColor: "text-green-500",
      icon: <Bitcoin  onClick={() => navigate("/bitcoin")} className="w-5 h-5 text-orange-500 cursor-pointer" />,
    },
    {
      name: "ETH",
      fullName: "Ethereum",
      price: "$3,231.54",
      change: "+3.61%",
      volume: "$38.10B",
      marketCap: "$390.06B",
      changeColor: "text-green-500",
      icon: <Ethereum className="w-5 h-5 text-purple-500" />,
    },
    {
      name: "XRP",
      fullName: "XRP",
      price: "$2.58",
      change: "+6.59%",
      volume: "$9.57B",
      marketCap: "$167.90B",
      changeColor: "text-green-500",
      icon: <Activity className="w-5 h-5 text-blue-500" />,
    },
    {
      name: "USDT",
      fullName: "TetherUS",
      price: "$1.00",
      change: "-0.08%",
      volume: "$137.44B",
      marketCap: "$137.22B",
      changeColor: "text-red-500",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
    },
    {
      name: "BNB",
      fullName: "BNB",
      price: "$695.12",
      change: "+4.20%",
      volume: "$2.02B",
      marketCap: "$100.04B",
      changeColor: "text-green-500",
      icon: <Coins className="w-5 h-5 text-yellow-500" />,
    },
    {
      name: "SOL",
      fullName: "Solana",
      price: "$187.75",
      change: "+5.40%",
      volume: "$4.86B",
      marketCap: "$91.31B",
      changeColor: "text-green-500",
      icon: <Sun className="w-5 h-5 text-purple-500" />,
    },
    {
      name: "DOGE",
      fullName: "Dogecoin",
      price: "$0.35167",
      change: "+9.97%",
      volume: "$3.74B",
      marketCap: "$51.46B",
      changeColor: "text-green-500",
      icon: <Dog className="w-5 h-5 text-yellow-500" />,
    },
    {
      name: "USDC",
      fullName: "USD Coin",
      price: "$1.00",
      change: "-0.07%",
      volume: "$9.49B",
      marketCap: "$45.79B",
      changeColor: "text-red-500",
      icon: <DollarSign className="w-5 h-5 text-blue-500" />,
    },
    {
      name: "ADA",
      fullName: "Cardano",
      price: "$0.9697",
      change: "+6.35%",
      volume: "$1.46B",
      marketCap: "$34.38B",
      changeColor: "text-green-500",
      icon: <Triangle className="w-5 h-5 text-blue-500" />,
    },
    {
      name: "TRX",
      fullName: "TRON",
      price: "$0.2252",
      change: "+2.04%",
      volume: "$868.59M",
      marketCap: "$19.39B",
      changeColor: "text-green-500",
      icon: <Zap className="w-5 h-5 text-red-500" />,
    },
  ];

  return (
    <div className="dark:bg-black bg-white dark:text-white text-black overflow-x-hidden">
      <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <div className=" p-6  flex-1">
            <h1 className="text-4xl font-bold text-center mb-10"
            >Markets Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[1080px] mx-auto">
              {/* Hot Coins */}
              <div className="p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                          hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <h2 className="text-lg font-semibold mb-4">Hot Coins</h2>
                <ul>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      BNB
                    </span>
                    <span>$695.97</span>
                    <span className="text-green-500">+3.98%</span>
                  </li>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Bitcoin className="w-4 h-4 text-orange-500" />
                      BTC
                    </span>
                    <span>$96.62K</span>
                    <span className="text-green-500">+5.38%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Ethereum className="w-4 h-4 text-purple-500" />
                      ETH
                    </span>
                    <span>$3.22K</span>
                    <span className="text-green-500">+3.22%</span>
                  </li>
                </ul>
              </div>

              {/* New Listing */}
              <div className="p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                          hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <h2 className="text-lg font-semibold mb-4">New Listing</h2>
                <ul>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      AIXBT
                    </span>
                    <span>$0.5666</span>
                    <span className="text-green-500">+39.69%</span>
                  </li>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      CGPT
                    </span>
                    <span>$0.3949</span>
                    <span className="text-green-500">+26.21%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      COOKIE
                    </span>
                    <span>$0.4785</span>
                    <span className="text-green-500">+18.62%</span>
                  </li>
                </ul>
              </div>

              {/* Top Gainer Coin */}
              <div className="p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                          hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <h2 className="text-lg font-semibold mb-4">Top Gainer Coin</h2>
                <ul>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      AIXBT
                    </span>
                    <span>$0.5666</span>
                    <span className="text-green-500">+39.69%</span>
                  </li>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      CGPT
                    </span>
                    <span>$0.3949</span>
                    <span className="text-green-500">+26.21%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-purple-500" />
                      PROS
                    </span>
                    <span>$0.5722</span>
                    <span className="text-green-500">+25.13%</span>
                  </li>
                </ul>
              </div>

              {/* Top Volume Coin */}
              <div className="p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                          hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <h2 className="text-lg font-semibold mb-4">Top Volume Coin</h2>
                <ul>
                  <li  
                  
                  className="flex justify-between items-center mb-2 cursor-pointer">
                    <span className="flex items-center gap-2 ">
                      <Bitcoin className="w-4 h-4 text-orange-500" />
                      BTC
                    </span>
                    <span>$96.62K</span>
                    <span className="text-green-500">+5.38%</span>
                  </li>
                  <li className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <Ethereum className="w-4 h-4 text-purple-500" />
                      ETH
                    </span>
                    <span>$3.22K</span>
                    <span className="text-green-500">+3.22%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      XRP
                    </span>
                    <span>$2.60</span>
                    <span className="text-green-500">+6.95%</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dark:bg-black bg-white dark:text-white text-black p-6 w-[1080px] mx-auto">
              <div className=" ">
                <div className="rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                          hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out border-solid border-blue-300 px-2 mb-6 mt-10 md:border-opacity-50">
                  <h2 className="text-xl font-bold mb-2 mt-3 px-2 ">Top Tokens by Market Capitalization</h2>
                  <p className="text-gray-400 mb-3 px-2">
                    Get a comprehensive snapshot of all cryptocurrencies available on Binance. This page displays the latest prices,
                    24-hour trading volume, price changes, and market capitalizations for all major tokens.
                  </p>
                </div>
              <CryptoPrices />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCapital;