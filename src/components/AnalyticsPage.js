import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";
import Sidebar from "../components/sideBar";
import { Video, BarChart2, Users, Play, FastForward, Rewind, Activity, Trash2, Zap } from "lucide-react";

const dummyResults = {
  "Strategy A": { totalReturn: "+24.5%", sharpeRatio: "1.8", maxDrawdown: "-12.3%", winRate: "62%" },
  "Strategy B": { totalReturn: "+18.2%", sharpeRatio: "1.5", maxDrawdown: "-10.1%", winRate: "58%" },
  "Strategy C": { totalReturn: "+30.8%", sharpeRatio: "2.1", maxDrawdown: "-8.5%", winRate: "70%" }
};

const AnalyticsPage = () => {
  const [strategyName, setStrategyName] = useState("");
  const [strategyText, setStrategyText] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [backtestResult, setBacktestResult] = useState(null);

  const runBacktest = () => {
    if (!strategyName.trim() || !strategyText.trim()) {
      toast.error("Please enter both strategy name and details before backtesting!");
      return;
    }

    setIsBacktesting(true);
    toast.info("Running backtest...");

    setTimeout(() => {
      setIsBacktesting(false);
      toast.success("Backtest completed successfully!");
      const newStrategy = { name: strategyName, details: strategyText };
      setStrategies([...strategies, newStrategy]);
      setStrategyName("");
      setStrategyText("");
      setIsFormOpen(false);
      setBacktestResult(dummyResults[strategyName] || dummyResults["Strategy A"]);
    }, 3000);
  };

  const deleteStrategy = (index) => {
    setStrategies(strategies.filter((_, i) => i !== index));
  };

  const handleStrategyClick = (strategy) => {
    setSelectedStrategy(strategy);
    setBacktestResult(dummyResults[strategy.name] || dummyResults["Strategy A"]);
    setStrategyText(strategy.details); // Set strategy text in the results
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white">
          <div className="min-h-screen dark:bg-black dark:text-white text-black bg-white p-8 w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold ">Analytics Dashboard</h1>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                Enter Your Strategy
              </button>
            </div>
            {isFormOpen && (
              <div className="mb-6  p-4 rounded-3xl">
                <input
                  className="w-full p-2  rounded-3xl mb-2"
                  placeholder="Enter strategy name..."
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                />
                <textarea
                  className="w-full p-2  rounded-3xl"
                  rows="4"
                  placeholder="Enter your strategy..."
                  value={strategyText}
                  onChange={(e) => setStrategyText(e.target.value)}
                ></textarea>
                <button
                  className="mt-4 bg-blue-500  py-2 px-6 rounded-xl hover:bg-blue-600 transition"
                  onClick={runBacktest}
                >
                  Backtest
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Video Recording Section */}
        <div className=" p-6 lg:col-span-2 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Video className="mr-2" /> Video Recordings
          </h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <div className="bg-blue-200 rounded-3xl flex items-center justify-center">
              <p className="text-gray-500">Live Trading Video Feed</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-blue-500  rounded-full hover:bg-blue-600">
              <Rewind size={20} />
            </button>
            <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
              <Play size={20} />
            </button>
            <button className="p-2 bg-blue-500  rounded-full hover:bg-blue-600">
              <FastForward size={20} />
            </button>
          </div>
        </div>

        {/* User Report */}
        <div className=" shadow-md p-6 border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
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
              <div className=" shadow-md p-6 border border-teal-500/20 rounded-3xl transition">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Users className="mr-2" /> Trading Strategies
                </h2>
                <ul className="space-y-4">
                  {strategies.map((strategy, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-700"
                      onClick={() => handleStrategyClick(strategy)}
                    >
                      <span>{strategy.name}</span>
                      <button onClick={() => deleteStrategy(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className=" p-6 lg:col-span-2 border border-teal-500/20 rounded-3xl transition">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <BarChart2 className="mr-2" /> Backtesting Results
                </h2>
                {isBacktesting ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : backtestResult ? (
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className=" p-4 border border-teal-500/20 rounded-3xl">
                        <h3 className="font-semibold mb-2">Total Return</h3>
                        <p className="text-2xl text-green-600">{backtestResult.totalReturn}</p>
                      </div>
                      <div className=" p-4 border border-teal-500/20 rounded-3xl">
                        <h3 className="font-semibold mb-2">Sharpe Ratio</h3>
                        <p className="text-2xl">{backtestResult.sharpeRatio}</p>
                      </div>
                      <div className=" p-4 border border-teal-500/20 rounded-3xl">
                        <h3 className="font-semibold mb-2">Max Drawdown</h3>
                        <p className="text-2xl text-red-600">{backtestResult.maxDrawdown}</p>
                      </div>
                      <div className=" p-4 border border-teal-500/20 rounded-3xl">
                        <h3 className="font-semibold mb-2">Win Rate</h3>
                        <p className="text-2xl">{backtestResult.winRate}</p>
                      </div>
                    </div>

                    {/* Display Strategy Details */}
                    <div className=" p-4 border border-teal-500/20 rounded-3xl">
                      <h3 className="font-semibold mb-2">Strategy Details</h3>
                      <p className="text-lg">{strategyText}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AnalyticsPage;
