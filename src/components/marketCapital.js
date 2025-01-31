import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import Header from "./header";
import Sidebar from "./sideBar";
import CryptoPrices from "./cryptoPrices";

const MarketCapital = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [mostUpvotedCoins, setMostUpvotedCoins] = useState([]);

  useEffect(() => {
    fetch("http://saveai.tech/api/coins/coins/trending")
      .then((response) => response.json())
      .then((data) => setTrendingCoins(data))
      .catch((error) => console.error("Error fetching trending coins:", error));

    fetch("http://saveai.tech/api/coins/coins/most-upvoted")
      .then((response) => response.json())
      .then((data) => setMostUpvotedCoins(data))
      .catch((error) => console.error("Error fetching most upvoted coins:", error));
  }, []);

  return (
    <div className="dark:bg-black bg-white dark:text-white text-black overflow-x-hidden ">
      <div className="min-h-screen bg-background text-foreground ">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex ">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <main className="w-[1296px] mx-auto">
          <div className="p-6   flex-1">
            <h1 className="text-4xl font-bold text-center mb-10">Markets Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Trending Coins */}
              <div className="p-4 border rounded-3xl border-teal-500/20 hover:scale-105 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <h2 className="text-lg font-semibold mb-4">Trending Coins</h2>
                <ul>
                  {trendingCoins.map((coin) => (
                    <li
                      key={coin.code}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="flex items-center gap-2 w-1/2 truncate">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-4 h-4 flex-shrink-0"
                        />
                        <span className="truncate">{coin.name}</span>
                      </span>
                      <span className="w-1/4 text-right truncate">{coin.cap}</span>
                      <span
                        className={`w-1/4 text-right truncate ${
                          coin.changes.day > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {coin.changes.day > 0
                          ? `+${coin.changes.day}%`
                          : `${coin.changes.day}%`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Most Upvoted Coins */}
              <div className="p-4 border rounded-3xl border-teal-500/20 hover:scale-105 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold mb-4">Most Upvoted Coins</h2>
                  <h3 className="font-semibold mb-2 mx-8">Votes</h3>
                </div>
                <ul>
                  {mostUpvotedCoins.map((coin) => (
                    <li
                      key={coin.code}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="flex items-center gap-2 w-1/2 truncate">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-4 h-4 flex-shrink-0"
                        />
                        <span className="truncate">{coin.name}</span>
                      </span>
                      <span className="flex items-center gap-4 w-1/2 justify-end">
                        <span className="text-green-500 flex items-center">
                          {coin.votes.up} <ArrowUp size={20} />
                        </span>
                        <span className="text-red-500 flex items-center">
                          {coin.votes.down} <ArrowDown size={20} />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="dark:bg-black bg-white dark:text-white text-black p-6">
              <div>
                <div className="rounded-3xl border-2 border-teal-500/20 hover:scale-105 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-oute px-2 mb-6 mt-10">
                  <h2 className="text-xl font-bold mb-2 mt-3 px-2">
                    Top Tokens by Market Capitalization
                  </h2>
                  <p className="text-gray-400 mb-3 px-2">
                    Get a comprehensive snapshot of all cryptocurrencies available on Binance. This page displays the latest prices,
                    24-hour trading volume, price changes, and market capitalizations for all major tokens.
                  </p>
                </div>
                <CryptoPrices />
              </div>
            </div>
          </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MarketCapital;