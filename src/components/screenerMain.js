import React from "react";
import  { useState, useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sideBar";


const ScreenerMain = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const stockData = [
    // Mock data for stock rows
    { symbol: "TCS", price: "3,294.10", change: "+0.95%", volume: "1.23M", marketCap: "12.11T", pe: "30.67", eps: "107.43", sector: "Technology", rating: "Buy" },
    { symbol: "INFY", price: "1,479.20", change: "-0.62%", volume: "1.11M", marketCap: "6.21T", pe: "27.98", eps: "52.87", sector: "Technology", rating: "Hold" },
    { symbol: "HDFCBANK", price: "1,664.90", change: "+0.48%", volume: "1.87M", marketCap: "10.98T", pe: "21.45", eps: "77.62", sector: "Financials", rating: "Buy" },
    { symbol: "ICICIBANK", price: "942.50", change: "+1.12%", volume: "2.13M", marketCap: "6.62T", pe: "23.18", eps: "40.68", sector: "Financials", rating: "Buy" },
    { symbol: "BHARTIARTL", price: "832.40", change: "+0.31%", volume: "1.05M", marketCap: "4.45T", pe: "59.62", eps: "13.96", sector: "Telecommunications", rating: "Hold" },
    { symbol: "WIPRO", price: "387.30", change: "-0.41%", volume: "3.74M", marketCap: "2.12T", pe: "22.51", eps: "17.20", sector: "Technology", rating: "Sell" },
    { symbol: "HDFC", price: "2,771.85", change: "+1.45%", volume: "930.15K", marketCap: "5.22T", pe: "22.73", eps: "121.97", sector: "Financials", rating: "Buy" },
    { symbol: "ITC", price: "368.20", change: "+0.89%", volume: "3.95M", marketCap: "4.63T", pe: "26.11", eps: "14.10", sector: "Consumer Goods", rating: "Buy" },
    { symbol: "LT", price: "2,195.40", change: "-0.12%", volume: "713.29K", marketCap: "3.09T", pe: "25.89", eps: "84.76", sector: "Industrials", rating: "Hold" },
    { symbol: "ASIANPAINT", price: "3,078.10", change: "+1.23%", volume: "583.18K", marketCap: "3.07T", pe: "63.91", eps: "48.16", sector: "Consumer Goods", rating: "Buy" },
    { symbol: "AXISBANK", price: "947.70", change: "+0.34%", volume: "2.03M", marketCap: "3.63T", pe: "22.34", eps: "42.43", sector: "Financials", rating: "Buy" },
    { symbol: "TATAMOTORS", price: "538.80", change: "+2.12%", volume: "3.25M", marketCap: "2.01T", pe: "26.72", eps: "20.17", sector: "Automobile", rating: "Buy" },
    { symbol: "SUNPHARMA", price: "1,035.40", change: "+0.68%", volume: "1.07M", marketCap: "2.48T", pe: "34.11", eps: "30.36", sector: "Healthcare", rating: "Hold" },
    { symbol: "ADANIGREEN", price: "899.10", change: "-0.82%", volume: "1.18M", marketCap: "1.41T", pe: "80.45", eps: "11.18", sector: "Energy", rating: "Sell" },
    { symbol: "MARUTI", price: "9,177.50", change: "+1.72%", volume: "215.44K", marketCap: "2.77T", pe: "35.89", eps: "255.77", sector: "Automobile", rating: "Buy" },
    { symbol: "ULTRACEMCO", price: "7,573.00", change: "+0.96%", volume: "153.10K", marketCap: "2.19T", pe: "31.54", eps: "240.11", sector: "Construction Materials", rating: "Buy" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white">
    <div className="flex flex-col min-h-screen  p-6 w-[1080px] mx-auto">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-xl font-bold ">Stock Screener</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          <button className=" px-4 py-2 rounded-3xl hover:bg-orange-500 bg-slate-700 ">Market</button>
          <button className=" px-4 py-2 rounded-3xl hover:bg-orange-500 ">Watchlist</button>
          <button className=" px-4 py-2 rounded-3xl hover:bg-orange-500 ">Index</button>
          <button className=" px-4 py-2 rounded-3xl hover:bg-orange-500 ">Price</button>
          <button className=" px-4 py-2 rounded-3xl hover:bg-orange-500 ">Change %</button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex space-x-4 border-b border-gray-700 pb-2 mb-4">
        <button className="text-blue-500 border-b-2 border-blue-500 pb-1">Overview</button>
        <button className="">Performance</button>
        <button className="">Valuation</button>
        <button className="">Dividends</button>
        <button className="">Profitability</button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700 text-left">Symbol</th>
              <th className="p-2 border border-gray-700 text-right">Price</th>
              <th className="p-2 border border-gray-700 text-right">Change %</th>
              <th className="p-2 border border-gray-700 text-right">Volume</th>
              <th className="p-2 border border-gray-700 text-right">Market Cap</th>
              <th className="p-2 border border-gray-700 text-right">P/E</th>
              <th className="p-2 border border-gray-700 text-right">EPS</th>
              <th className="p-2 border border-gray-700 text-left">Sector</th>
              <th className="p-2 border border-gray-700 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
              <tr key={index} className="">
                <td className="p-2 border border-gray-700 ">{stock.symbol}</td>
                <td className="p-2 border border-gray-700 text-right">{stock.price}</td>
                <td
                  className={`p-2 border border-gray-700 text-right ${
                    stock.change.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stock.change}
                </td>
                <td className="p-2 border border-gray-700 text-right ">{stock.volume}</td>
                <td className="p-2 border border-gray-700 text-right ">{stock.marketCap}</td>
                <td className="p-2 border border-gray-700 text-right ">{stock.pe}</td>
                <td className="p-2 border border-gray-700 text-right ">{stock.eps}</td>
                <td className="p-2 border border-gray-700 ">{stock.sector}</td>
                <td className="p-2 border border-gray-700 ">{stock.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
};

export default ScreenerMain;
