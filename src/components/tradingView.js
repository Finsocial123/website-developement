import { MainChart, VolumeChart, BTCEarningsChart } from './Chart';
import { ArrowUp } from 'lucide-react';
import TransferCoins from './TransferCoins';
import TransactionForm from './TransactionForm';
import Header from './header';
import Sidebar from './sideBar';
import React, { useState } from 'react';

const TradingView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

        {/* Main Content */}
        <main className="flex-1 w-[1080px] mx-auto p-6 overflow-y-auto overflow-x-hidden bg-white dark:bg-black text-black dark:text-white">
          
          {/* Page Title */}
          <div className="text-white w-[250px] text-center text-2xl font-bold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 mb-6">
            Trade Dashboard
          </div>

          {/* Charts Section */}
          <div className="flex space-x-6 mb-6 w-[1080px] mx-auto">
            <div className="h-[400px] flex-1 p-4 border border-teal-500 hover:scale-110 rounded-3xl transition-all duration-300 ease-in-out">
              <h2>Main Chart</h2>
              <MainChart />
            </div>
            <div className="h-[400px] flex-1 p-4 border border-teal-500 hover:scale-110 transition-all duration-300 ease-in-out rounded-3xl">
              <h2>Volume Chart</h2>
              <VolumeChart />
            </div>
          </div>

          {/* BTC Earnings Section */}
          <div className="flex space-x-6 mb-6 w-[1080px] mx-auto">
            <div className="h-[500px] flex-1 p-6 rounded-3xl border border-teal-500 hover:scale-110 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-4 ">
                <h3 className="text-lg">BTC Earnings</h3>
                <div className="flex items-center text-green-500 ">
                  <ArrowUp size={16} />
                  <span>79.34%</span>
                </div>
              </div>
              <BTCEarningsChart />
            </div>
          </div>

          {/* Transfer & Transaction Form Section */}
          <div className="flex w-[1080px] mx-auto  ">
            <div className="flex-1">
              <TransferCoins />
            </div>
            <div className="flex-1">
              <TransactionForm />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default TradingView;
