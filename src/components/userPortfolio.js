import React, { useState } from "react"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Header from "../components/header"
import Sidebar from "../components/sideBar"
import { useNavigate } from "react-router-dom"


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const generateDummyData = (baseValue, volatility, dataPoints) => {
  return Array.from({ length: dataPoints }, (_, i) => {
    const change = (Math.random() - 0.5) * volatility
    return baseValue * (1 + change)
  })
}

const timeIntervals = ["1D", "7D", "1M", "3M", "6M", "1Y", "ALL"]


export default function UserPortfolio() {
const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [activeInterval, setActiveInterval] = useState("1D")

  const tvlData = generateDummyData(24.7, 0.1, 24)
  const volumeData = generateDummyData(32.4, 0.2, 24)

  const labels = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const chartData = {
    tvl: {
      labels,
      datasets: [
        {
          data: tvlData,
          borderColor: "#f4a261",
          backgroundColor: "rgba(244, 162, 97, 0.1)",
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    volume: {
      labels,
      datasets: [
        {
          data: volumeData,
          backgroundColor: "#2c2c2c",
          borderRadius: 2,
          barThickness: 8,
        },
      ],
    },
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#1a1a1a",
        titleColor: "#fff",
        bodyColor: "#f4a261",
        borderColor: "#333",
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => `$${item.raw.toFixed(2)}M`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 10,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#333",
          drawBorder: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 10,
          },
          padding: 8,
          callback: (value) => `$${value}M`,
        },
        border: {
          display: false,
        },
      },
    },
  }

  const tvlOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        min: Math.min(...tvlData) * 0.95,
        max: Math.max(...tvlData) * 1.05,
      },
    },
  }

  const volumeOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        min: 0,
        max: Math.max(...volumeData) * 1.1,
      },
    },
  }

  return (
   <div className="dark:bg-black bg-white dark:text-white text-black overflow-x-hidden">
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white">
          <div className="w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row min-h-screen w-[1200px] mx-auto p-4 lg:p-6 dark:bg-black dark:text-white text-black bg-white">
              <div className="flex-1 lg:pr-6">
                {/* TVL Section */}
                <div className="mb-8  p-4 rounded-3xl border border-teal-500 dark:bg-black dark:text-white text-black bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-white text-lg font-medium">TOTAL VALUE LOCKED (TVL)</h2>
                      <p className="text-[#f4a261] text-2xl font-bold mt-1">${tvlData[tvlData.length - 1].toFixed(2)}M</p>
                      <p className="text-[#808080] text-[10px] mt-1">29 Aug 2023</p>
                    </div>
                    <div className="flex bg-[#1a1a1a] rounded-md p-0.5 mt-2 sm:mt-0">
                      {timeIntervals.map((interval) => (
                        <button
                          key={interval}
                          onClick={() => setActiveInterval(interval)}
                          className={`px-2 py-1 rounded-md text-xs ${
                            interval === activeInterval ? "bg-[#f4a261] text-white" : "text-[#808080] hover:text-white"
                          }`}
                        >
                          {interval}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-[240px] w-full">
                    <Line data={chartData.tvl} options={tvlOptions} />
                  </div>
                </div>

                {/* Volume Section */}
                <div className="dark:bg-black dark:text-white text-black bg-white p-4 rounded-3xl border border-teal-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 ">
                    <div>
                      <h2 className="text-white text-lg font-medium">VOLUME</h2>
                      <p className="text-[#f4a261] text-2xl font-bold mt-1">${volumeData[volumeData.length - 1].toFixed(2)}M</p>
                      <p className="text-[#808080] text-[10px] mt-1">29 Aug 2023</p>
                    </div>
                    <div className="flex bg-[#1a1a1a] rounded-md p-0.5 mt-2 sm:mt-0">
                      {timeIntervals.map((interval) => (
                        <button
                          key={interval}
                          onClick={() => setActiveInterval(interval)}
                          className={`px-2 py-1 rounded-md text-xs ${
                            interval === activeInterval ? "bg-[#f4a261] text-white" : "text-[#808080] hover:text-white"
                          }`}
                        >
                          {interval}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-[240px] w-full">
                    <Bar data={chartData.volume} options={volumeOptions} />
                  </div>
                </div>
              </div>
              

              {/* Right Sidebar */}
              <div className="w-full lg:w-[300px] mt-8 lg:mt-0 space-y-4 dark:bg-black dark:text-white text-black bg-white ">
                {/* Token Selection */}
                <div className="space-y-2 border border-teal-500 rounded-3xl">
                  <div className="flex items-center justify-between  p-3 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#62ad6c]" />
                      <span className="text-sm">ETH</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between  p-3 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#2775ca]" />
                      <span className="text-sm">USDC</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Commission Section */}
                <div className=" p-4 rounded-3xl border border-teal-500">
                  <h3 className="text-[#808080] text-xs mb-3">Commission</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm">0.01%</p>
                      <p className="text-[#f4a261] text-xs">0% select</p>
                    </div>
                    <div>
                      <p className="text-sm">0.05%</p>
                      <p className="text-[#f4a261] text-xs">56% select</p>
                    </div>
                    <div>
                      <p className="text-sm">0.3%</p>
                      <p className="text-[#f4a261] text-xs">42% select</p>
                    </div>
                    <div>
                      <p className="text-sm">1%</p>
                      <p className="text-[#f4a261] text-xs">2% select</p>
                    </div>
                  </div>
                </div>

                {/* Price Inputs */}
                <div className="dark:bg-black dark:text-white text-black bg-white rounded-3xl border border-teal-500">
                  <div className="p-3 border-b border-[#333]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#808080] text-xs">Low price</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">1644.2381</span>
                        <div className="space-y-1">
                          <button className="block text-[#808080] hover:text-white">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                          </button>
                          <button className="block text-[#808080] hover:text-white">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#808080] text-xs">High price</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">1654.1327</span>
                        <div className="space-y-1">
                          <button className="block text-[#808080] hover:text-white">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                          </button>
                          <button className="block text-[#808080] hover:text-white">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Liquidity Button */}
                <button className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#f3934d] transition-colors">
                  ADD LIQUIDITY
                </button>
                
              </div>

              
            </div>
          </div>
          <div className="dark:bg-black dark:text-white text-black bg-white p-10 w-[1168px] mx-auto border border-teal-500 rounded-3xl">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="text-sm font-medium text-gray-400 hover:bg-orange-600 py-2 px-4 rounded-3xl">ALL POOLS</button>
          <button className="text-sm font-medium text-gray-400 hover:bg-orange-600 py-2 px-4 rounded-3xl">FARM</button>
          <button className="text-sm font-medium text-gray-400 hover:bg-orange-600 py-2 px-4 rounded-3xl">OPTIONS</button>
          <button className="text-sm font-medium text-gray-400 hover:bg-orange-600 py-2 px-4 rounded-3xl">COLLATERAL</button>
          <button className="text-sm font-medium text-gray-400 hover:bg-orange-600 py-2 px-4 rounded-3xl">VAULT</button>
        </div>
        <button className="bg-orange-500 px-4 py-2 rounded text-sm font-medium">+ ADD POOL</button>
      </div>

      {/* Farm Pools Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">4/16 Farm Pools</span>
        <div className="flex space-x-2 text-orange-500">
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>

      {/* Farm Pools */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pool Card 1 */}
        <div className=" p-4 rounded-3xl border-t border-orange-400 border-b ">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Curve</span>
            <span className="text-xs bg-orange-500 text-black px-2 py-0.5 rounded">Farm Pool</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">sETH 2 to ETH</h3>
          <p className="text-sm text-gray-400 mb-4">
            Become a liquidity provider to allow instantaneous swaps between sETH ETH StakWise users
          </p>
          <button className="bg-orange-500 px-4 py-2 rounded text-sm font-medium">CHECK GUIDE</button>
        </div>

        {/* Pool Card 2 */}
        <div className=" p-4 rounded-3xl border-t border-orange-400 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Mooniswap</span>
            <span className="text-xs bg-orange-500 text-black px-2 py-0.5 rounded">Farm Pool</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">ETH to DAI</h3>
          <p className="text-sm text-gray-400 mb-4">
            Become a liquidity provider to allow instantaneous swaps between ETH DAI StakWise users
          </p>
          <button className="bg-orange-500 px-4 py-2 rounded text-sm font-medium">CHECK GUIDE</button>
        </div>
      </div>
     </div>
     
          </main>
        </div>
        
      </div>
    </div>
  )
}