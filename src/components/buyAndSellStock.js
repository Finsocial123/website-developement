
import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sideBar";

const BuySellStock = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white">
    <div className="flex flex-col min-h-screen  p-8 w-[1080px] mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6  text-center hover:text-3xl hover:text-orange-500">BUY & SELL</h1>

      {/* Tabs Section */}
      <div className="flex justify-center space-x-6 mb-8">
        {["Selling", "Buying", "Exchange"].map((tab, index) => (
          <div
            key={index}
            className="flex-1 p-4  text-center rounded-3xl border border-teal-500   transition transform hover:-translate-y-1 hover:scale-105 duration-300"
          >
            <h2 className="text-lg font-semibold">{tab}</h2>
            <p className="text-sm ">
              {tab === "Exchange" ? "Pending Tokens" : "Confirmed Tokens"}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buy Cryptocurrency Section */}
        <div className="p-6  rounded-3xl border border-teal-500   transition transform hover:-translate-y-1 hover:scale-80 duration-300">
          <h3 className="text-lg font-semibold  mb-4">Buy Cryptocurrency</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm  mb-1">
                Select the cryptocurrency <span className="">(min "0.001 BTC")</span>
              </label>
              <select className="w-full p-2  rounded">
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Litecoin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm  mb-1">
                Choose payment method <span className="">(min "0.001 BTC")</span>
              </label>
              <select className="w-full p-2  rounded">
                <option>Bank of the Galaxy</option>
                <option>PayPal</option>
                <option>Credit Card</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm  mb-1">Wallet address</label>
              <input
                type="text"
                className="w-full p-2  rounded"
                placeholder="Enter wallet address"
              />
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm  mb-1">Exchange amount</label>
                <input
                  type="text"
                  className="w-full p-2  rounded"
                  placeholder="USD"
                />
              </div>
              <span className="text-xl ">⇄</span>
              <div className="flex-1">
                <label className="block text-sm  mb-1">Equivalent amount</label>
                <input
                  type="text"
                  className="w-full p-2  rounded"
                  placeholder="BTC"
                />
              </div>
            </div>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">
              Buy Cryptocurrency
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="p-6  rounded-3xl border border-teal-500   transition transform hover:-translate-y-1 hover:scale-80 duration-300">
          <h3 className="text-lg font-semibold  mb-4">You Are Buying The Following</h3>
          <div className="text-3xl font-bold  mb-2">5.6307173 BTC</div>
          <p className="text-sm ">@12,347 per BTC</p>
          <div className="mt-4">
            <p className="text-sm ">Bank of the Galaxy</p>
            <p className="text-sm ">Payment method</p>
          </div>
        </div>

        {/* Sell Cryptocurrency Section */}
        <div className="p-6  rounded-3xl border border-teal-500  transition transform hover:-translate-y-1 hover:scale-80 duration-300">
          <h3 className="text-lg font-semibold  mb-4">Sell Cryptocurrency</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm  mb-1">
                Select crypto balance <span className="">(min "0.001 BTC")</span>
              </label>
              <select className="w-full p-2  rounded">
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Litecoin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm  mb-1">Crypto amount</label>
              <input
                type="text"
                className="w-full p-2  rounded"
                placeholder="min amount 0.001 BTC"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm  mb-1">Account password</label>
              <input
                type="password"
                className="w-full p-2  rounded"
                placeholder="Enter account password"
              />
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm  mb-1">Exchange amount</label>
                <input
                  type="text"
                  className="w-full p-2  rounded"
                  placeholder="USD"
                />
              </div>
              <span className="text-xl text-white">⇄</span>
              <div className="flex-1">
                <label className="block text-sm  mb-1">Equivalent amount</label>
                <input
                  type="text"
                  className="w-full p-2  rounded"
                  placeholder="BTC"
                />
              </div>
            </div>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">
              Place Selling Order
            </button>
          </form>
        </div>

        {/* Recent Orders */}
        <div className="p-6  rounded-3xl border border-teal-500  transition transform hover:-translate-y-1 hover:scale-80 duration-300">
          <h3 className="text-lg font-semibold  mb-4">Recent Buying & Selling Orders</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Deal ID Number</th>
                <th className="py-2">Trade Time</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "126515", time: "17:24 AM", status: "complete" },
                { id: "123675", time: "18:14 AM", status: "pending" },
                { id: "159034", time: "21:24 AM", status: "cancelled" },
              ].map((order, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.time}</td>
                  <td
                    className={`py-2 ${
                      order.status === "complete"
                        ? "text-green-500"
                        : order.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
};

export default BuySellStock;
