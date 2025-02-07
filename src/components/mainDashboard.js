
import React, { useState, useEffect } from "react";
import TransformForm from "../components/transformForm";
import RecentTrading from "../components/recentTrading";
import SafeDeals from "../components/safeDeals";
import WalletAddress from "../components/walletAddress";
import Balance from "../components/balanceStatistics";
import Live from "../components/liveCrypto";
import RecentTransactions from "../components/recentTransaction";
import bitcoin from "../images/coin-btc.png";
import dash from "../images/coin-dash.png";
import lite from "../images/coin-lite.png";
import Header from '../components/header'
import Sidebar from '../components/sideBar'
import { useLocation } from "react-router-dom";


const MainDashboard = () => {
  const location = useLocation();
  const message = location.state?.message || "";
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  return (

    <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className='flex-1 p-4 dark:bg-black dark:text-white text-black bg-white'>
    <div className="min-h-screen dark:bg-black dark:text-white text-black bg-white">
      <div className="p-4 w-[1296px] mx-auto">
        <div className="text-white w-[200px] text-center text-2xl font-bold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400">
          Dashboard
          {message && <p>{message}</p>}
        </div>
      </div>

      
      <div className="flex p-4 space-x-9 w-[1296px] mx-auto flex-wrap ">
        
        <div className="w-[370px] h-[100px] sm:w-[150px] md:w-[270px] lg:w-[370px] dark:bg-black dark:text-white text-black bg-white border-teal-500/20 border-2 rounded-lg flex hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300 ease-in-out hover:scale-105">
          <div>
            <img src={bitcoin} className="p-6" alt="Bitcoin Icon" />
          </div>
          <div>
            <p className="mt-6 font-semibold">Wallet BTC Balance</p>
            
          </div>
        </div>

        
        <div className="w-[370px] h-[100px] sm:w-[150px] md:w-[270px] lg:w-[370px] dark:bg-black dark:text-white text-black bg-white border-teal-500/20 border-2 rounded-lg flex hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300 ease-in-out hover:scale-105">
          <div>
            <img src={dash} className="p-6" alt="Dash Icon" />
          </div>
          <div>
            <p className="mt-6 font-semibold">Wallet Dash Balance</p>
            
          </div>
        </div>

        
        <div className="w-[370px] h-[100px] sm:w-[150px] md:w-[270px] lg:w-[370px] dark:bg-black dark:text-white text-black bg-white border-teal-500/20 border-2 rounded-lg flex hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300 ease-in-out hover:scale-105">
          <div>
            <img src={lite} className="p-6" alt="Litecoin Icon" />
          </div>
          <div>
            <p className="mt-6 font-semibold">Unavailable Balance</p>
            
          </div>
        </div>
      </div>

      
      <div className="p-4 flex space-x-10 w-[1296px] mx-auto">
        <div >
          <Balance />
        </div>
        <div>
          <Live />
        </div>
      </div>
      <div className="p-4 flex space-x-5 w-[1296px] mx-auto">
        <div>
          <TransformForm />
        </div>
        <div>
          <RecentTransactions />
        </div>
        <div>
          <WalletAddress />
        </div>
      </div>
      <div className="flex space-x-5 p-4 w-[1296px] mx-auto">
        <div>
          <SafeDeals />
        </div>
        <div>
          <RecentTrading />
        </div>
      </div>
    </div>
    </main>
        </div>
      </div>
  );
};

export default MainDashboard;
