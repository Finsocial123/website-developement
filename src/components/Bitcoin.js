import React from "react"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, ComposedChart, Line } from "recharts"

// Chart data
const data = [
  { date: "Mar", open: 52000, close: 55000, high: 56000, low: 51000 },
  { date: "Apr", open: 55000, close: 58000, high: 59000, low: 54000 },
  { date: "May", open: 58000, close: 62000, high: 63000, low: 57000 },
  { date: "Jun", open: 62000, close: 68000, high: 69000, low: 61000 },
  { date: "Jul", open: 68000, close: 75000, high: 76000, low: 67000 },
  { date: "Aug", open: 75000, close: 82000, high: 83000, low: 74000 },
  { date: "Sep", open: 82000, close: 88000, high: 89000, low: 81000 },
  { date: "Oct", open: 88000, close: 92000, high: 93000, low: 87000 },
  { date: "Nov", open: 92000, close: 97000, high: 98000, low: 91000 },
  { date: "Dec", open: 97000, close: 100000, high: 101000, low: 96000 },
  { date: "2025", open: 100000, close: 102695.98, high: 103000, low: 99000 },
]

// News data
const newsData = [
  {
    id: 1,
    title: "Bitcoin ETF Approval Drives Market Surge",
    time: "2 hours ago",
    source: "CryptoNews",
  },
  {
    id: 2,
    title: "Bitcoin Mining Difficulty Hits New All-Time High",
    time: "5 hours ago",
    source: "BlockchainDaily",
  },
  {
    id: 3,
    title: "Major Bank Adds Bitcoin to Treasury Holdings",
    time: "8 hours ago",
    source: "CoinDesk",
  },
  {
    id: 4,
    title: "Bitcoin Lightning Network Capacity Reaches Record Level",
    time: "12 hours ago",
    source: "BitcoinMagazine",
  },
]

function Bitcoin() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
            alt="Bitcoin Logo"
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-2xl font-bold">BITCOIN</h1>
            <div className="flex gap-2 text-sm">
              <span>BTC</span>
              <span className="text-orange-400">CRYPTO</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-bold">102,695.98</h2>
            <span className="text-green-400">USD</span>
            <span className="text-green-400">(0.08%)</span>
          </div>
          <p className="text-sm text-gray-300">▲ 24H CHANGE</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-8">
          <div>
            <p className="text-gray-300">Market Cap</p>
            <p className="text-xl font-bold">$2.03T</p>
            <p className="text-xs text-green-400">+0.04%</p>
          </div>
          <div>
            <p className="text-gray-300">Volume (24h)</p>
            <p className="text-xl font-bold">$42.92B</p>
            <p className="text-xs text-red-400">-42.95%</p>
          </div>
          <div>
            <p className="text-gray-300">FDV</p>
            <p className="text-xl font-bold">$2.15T</p>
          </div>
          <div>
            <p className="text-gray-300">Vol/Mkt Cap (24h)</p>
            <p className="text-xl font-bold">2.11%</p>
          </div>
          <div>
            <p className="text-gray-300">Total Supply</p>
            <p className="text-xl font-bold">19.81M BTC</p>
          </div>
          <div>
            <p className="text-gray-300">Max Supply</p>
            <p className="text-xl font-bold">21M BTC</p>
          </div>
          <div>
            <p className="text-gray-300">Circulating Supply</p>
            <p className="text-xl font-bold">19.81M BTC</p>
          </div>
        </div>

        {/* Main Content Section with Chart and Community Sentiment */}
        <div className="flex gap-6 ">
          {/* Chart Section */}
          <div
            className="flex-1 bg-black rounded-3xl border-2 border-teal-500/20 hover:scale-10 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center p-4">
              <h3 className="text-xl font-bold">Price Chart</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-[#2C2B35] rounded">1D</button>
                <button className="px-3 py-1 text-sm bg-[#2C2B35] rounded">7D</button>
                <button className="px-3 py-1 text-sm bg-[#2C2B35] rounded">1M</button>
                <button className="px-3 py-1 text-sm bg-[#2C2B35] rounded">1Y</button>
                <button className="px-3 py-1 text-sm bg-blue-600 rounded">ALL</button>
              </div>
            </div>
            <div className="h-[400px] w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{ background: "#1C1B24", border: "1px solid #2C2B35" }}
                    labelStyle={{ color: "#ffffff" }}
                    formatter={(value, name) => [`$${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                  <Bar dataKey="low" stackId="a" fill="transparent" />
                  <Bar dataKey="open" stackId="a" fill="#F7931A" />
                  <Bar dataKey="close" stackId="a" fill="#F7931A" />
                  <Bar dataKey="high" stackId="a" fill="transparent" />
                  <Line type="monotone" dataKey="low" stroke="#F7931A" dot={false} />
                  <Line type="monotone" dataKey="high" stroke="#F7931A" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Community Sentiment Side Panel */}
          <div
            className="w-80 bg-black rounded-3xl border-2 border-teal-500/20 hover:scale-10 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-4">Community Sentiment</h3>
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Bullish</span>
                  <span className="text-green-400">80%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[80%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Bearish</span>
                  <span className="text-red-400">20%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 w-[20%]"></div>
                </div>
              </div>
            </div>

            {/* News Section */}
            <div className="mt-6 border-t border-gray-800 pt-6">
              <h4 className="text-lg font-semibold mb-4">Latest News</h4>
              <div className="space-y-4">
                {newsData.map((news) => (
                  <div key={news.id} className="group cursor-pointer">
                    <h5 className="text-sm font-medium group-hover:text-blue-400 transition-colors">{news.title}</h5>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View More Button */}
            <button className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View More News →
            </button>
          </div>
        </div>

        {/* About Bitcoin Section */}
        <div
          className="bg-black rounded-3xl border-2 border-teal-500/20 hover:scale-10 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out p-6"
        >
          <h3 className="text-xl font-bold mb-4">About Bitcoin</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group
              of people, using the alias Satoshi Nakamoto. It was launched shortly after, in January 2009.
            </p>
            <p>
              Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal,
              independent network participants, without the need for any intermediary to permit or facilitate them.
              Bitcoin was created, according to Nakamoto's own words, to allow "online payments to be sent directly from
              one party to another without going through a financial institution."
            </p>
            <p>
              Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the
              distinction of being the first-ever cryptocurrency to come into actual use.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bitcoin;