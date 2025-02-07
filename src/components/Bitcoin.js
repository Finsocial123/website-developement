import React from "react"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, ComposedChart, Line } from "recharts"
import { useEffect, useState } from "react";


function Bitcoin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch monthly BTC price data from Binance
  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=12"
        );
        const result = await response.json();

        // Format data to match Recharts format
        const formattedData = result.map((entry) => ({
          date: new Date(entry[0]).toLocaleString("default", { month: "short", year: "numeric" }),
          open: parseFloat(entry[1]),
          high: parseFloat(entry[2]),
          low: parseFloat(entry[3]),
          close: parseFloat(entry[4]),
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
      }
    };

    fetchBitcoinData();
  }, []);


  const [newsData, setNewsData] = useState([]);
  const [sentiment, setSentiment] = useState({
    bullish: 0,
    bearish: 0,
  });

  useEffect(() => {
    fetch("http://saveai.tech/api/news/all", {
      headers: {
        'x-secret-code': 'finsocialdigitalsystemsscretcodes$$$!!!!@@#$$'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const selectedNews = [];
        ["crypto", "finance", "trading", "market_impact"].forEach((category) => {
          if (data[category] && data[category].length > 0) {
            selectedNews.push(data[category][0]);
          }
        });
        setNewsData(selectedNews);
      })
      .catch((error) => console.error("Error fetching news data:", error));
  }, []);

  useEffect(() => {
    fetch("http://saveai.tech/api/crypto/vote/bitcoin", {
      headers: {
        'x-secret-code': 'finsocialdigitalsystemsscretcodes$$$!!!!@@#$$'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setSentiment({ bullish: data.bullish_percentage, bearish: data.bearish_percentage });
      })
      .catch((error) => console.error("Error fetching sentiment data:", error));
  }, []);
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
             <div className="flex-1 bg-black rounded-3xl border-2 border-teal-500/20 hover:scale-10 
                             hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out p-4">
                 <div className="flex justify-between items-center py-8">
                    <h3 className="text-2xl font-bold text-white">Price Chart</h3>
                 </div>
                     <div className="h-[400px] w-full p-4">
                        {loading ? (
                       <p className="text-white text-center">Loading data...</p>
                          ) : (
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={data}>
                          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          />
                         <Tooltip
                         contentStyle={{ background: "#1C1B24", border: "1px solid #2C2B35" }}
                         labelStyle={{ color: "#ffffff" }}
                         formatter={(value, name) => [`$${value.toLocaleString()}`, name.toUpperCase()]}
                        />
                         <Bar dataKey="low" stackId="a" fill="transparent" />
                         <Bar dataKey="open" stackId="a" fill="#F7931A" />
                         <Bar dataKey="close" stackId="a" fill="#F7931A" />
                         <Bar dataKey="high" stackId="a" fill="transparent" />
                         <Line type="monotone" dataKey="low" stroke="#F7931A" dot={false} />
                         <Line type="monotone" dataKey="high" stroke="#F7931A" dot={false} />
                     </ComposedChart>
                  </ResponsiveContainer>
                        )}
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
                  <span className="text-green-400">{sentiment.bullish.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: `${sentiment.bullish}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Bearish</span>
                  <span className="text-red-400">{sentiment.bearish.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-400" style={{ width: `${sentiment.bearish}%` }}></div>
                </div>
              </div>
            </div>

            {/* News Section */}
            <div className="mt-6 border-t border-gray-800 pt-6">
                <h4 className="text-lg font-semibold mb-4">Latest News</h4>
              <div className="space-y-4">
                  {newsData.map((news, index) => (
               <div
                  key={index}
                  className="group cursor-pointer flex gap-4 items-center"
                  onClick={() => window.open(news.source, "_blank")}
                >
                  {news.image && (
                  <img src={news.image} alt={news.title} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <h5 className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                  {news.title}
                  </h5>
               </div>
                  ))}
              </div>
           </div>
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

export default Bitcoin