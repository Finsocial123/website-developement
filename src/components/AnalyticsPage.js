import { useState } from "react"
import { Video, BarChart2, Users, Play, FastForward, Rewind, Activity, Zap, Cpu, Database } from "lucide-react"

const AnalyticsPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null)
  const [isBacktesting, setIsBacktesting] = useState(false)

  const runBacktest = () => {
    setIsBacktesting(true)
    setTimeout(() => setIsBacktesting(false), 3000) // Simulate backtesting process
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white"> Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Recording Section */}
        <div className="bg-black p-6 lg:col-span-2 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Video className="mr-2" /> Video Recordings
          </h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <div className="bg-blue-200 rounded-3xl flex items-center justify-center">
              <p className="text-gray-500">Live Trading Video Feed</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              <Rewind size={20} />
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              <Play size={20} />
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              <FastForward size={20} />
            </button>
          </div>
        </div>

        {/* User Report */}
        <div className="bg-black shadow-md p-6 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2" /> User Performance
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Profit:</span>
              <span className="text-green-600">+1.24 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Win Rate:</span>
              <span>68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Best Trade:</span>
              <span className="text-green-600">+0.5 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Worst Trade:</span>
              <span className="text-red-600">-0.2 ETH</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-200 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Zap className="mr-2" /> AI Insights
            </h3>
            <p className="text-sm text-blue-800">
              Based on your trading pattern, our AI suggests focusing on swing trading strategies for better
              performance.
            </p>
          </div>
        </div>

        {/* Backtesting Report */}
        <div className="bg-black p-6 lg:col-span-2 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" /> Backtesting Results
          </h2>
          {isBacktesting ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-black p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <h3 className="font-semibold mb-2">Total Return</h3>
                  <p className="text-2xl text-green-600">+24.5%</p>
                </div>
                <div className="bg-black p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <h3 className="font-semibold mb-2">Sharpe Ratio</h3>
                  <p className="text-2xl">1.8</p>
                </div>
                <div className="bg-black p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out ">
                  <h3 className="font-semibold mb-2">Max Drawdown</h3>
                  <p className="text-2xl text-red-600">-12.3%</p>
                </div>
                <div className="bg-black p-4 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <h3 className="font-semibold mb-2">Win Rate</h3>
                  <p className="text-2xl">62%</p>
                </div>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-600 transition-colors"
                onClick={runBacktest}
              >
                Run New Backtest
              </button>
            </>
          )}
        </div>

        {/* User Strategies */}
        <div className="bg-black shadow-md p-6 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Trading Strategies
          </h2>
          <ul className="space-y-4">
            {["Moving Average Crossover", "RSI Oscillator", "Bollinger Bands", "MACD"].map((strategy, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer`}
                onClick={() => setSelectedStrategy(strategy)}
              >
                <span>{strategy}</span>
                <div className="flex items-center space-x-2">
                  <Cpu className="text-gray-500" size={16} />
                  <Database className="text-gray-500" size={16} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-black border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20">
            <h3 className="font-semibold mb-2">Selected Strategy:</h3>
            <p>{selectedStrategy || "None selected"}</p>
          </div>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-3xl hover:bg-green-600 transition-colors">
            Create New Strategy
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage