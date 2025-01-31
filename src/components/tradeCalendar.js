import React, { useState } from "react";

import Header from "./header";
import Sidebar from "./sideBar";


const TradeCalendar = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const events = [
    // Mock data for events
    { date: "Monday, January 20", time: "08:30", country: "United States", event: "Building Permits (Dec)", actual: "1.23M", forecast: "1.25M", prior: "1.27M" },
    { date: "Monday, January 20", time: "09:00", country: "Eurozone", event: "ZEW Economic Sentiment Index (Jan)", actual: "48.5", forecast: "50.0", prior: "47.6" },
    { date: "Tuesday, January 21", time: "13:00", country: "United States", event: "10-Year Note Auction", actual: "1.887%", forecast: "--", prior: "1.872%" },
    { date: "Wednesday, January 22", time: "07:00", country: "United Kingdom", event: "Consumer Price Index (YoY) (Dec)", actual: "2.1%", forecast: "2.0%", prior: "1.8%" },
    { date: "Wednesday, January 22", time: "10:00", country: "Germany", event: "IFO Business Climate Index (Jan)", actual: "95.9", forecast: "96.0", prior: "94.8" },
    { date: "Thursday, January 23", time: "15:30", country: "Canada", event: "Retail Sales (MoM) (Nov)", actual: "0.3%", forecast: "0.5%", prior: "-0.1%" },
    { date: "Friday, January 24", time: "09:30", country: "Australia", event: "Producer Price Index (QoQ) (Q4)", actual: "0.7%", forecast: "0.5%", prior: "0.4%" },
    { date: "Friday, January 24", time: "11:00", country: "Japan", event: "BoJ Interest Rate Decision", actual: "-0.1%", forecast: "-0.1%", prior: "-0.1%" },
    { date: "Saturday, January 25", event: "No scheduled reports" },
    { date: "Sunday, January 26", event: "No scheduled reports" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white">
    <div className="flex flex-col min-h-screen p-6 space-y-6 w-[1080px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold  hover:text-2xl hover:text-orange-500">Economic Calendar</h1>
        <div className="flex items-center gap-4">
          <button className=" px-3 py-1 rounded-md ">Today</button>
          <div className="flex items-center gap-2">
            <button className="text-gray-500">&lt;</button>
            <span className="text-white">Jan 13 — Jan 19, 2025</span>
            <button className="text-gray-500">&gt;</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-gray-800 px-4 py-2 rounded-3xl text-white hover:bg-orange-500">Economic</button>
        <button className="bg-gray-800 px-4 py-2 rounded-3xl text-white hover:bg-orange-500">Earnings</button>
        <button className="bg-gray-800 px-4 py-2 rounded-3xl text-white hover:bg-orange-500">Revenue</button>
        <button className="bg-gray-800 px-4 py-2 rounded-3xl text-white hover:bg-orange-500">Dividends</button>
      </div>

      {/* Events Section */}
      <div className=" rounded-md overflow-hidden">
        {events.map((event, index) => (
          <div key={index} className="border-b border-gray-700 last:border-0">
            <div className="px-4 py-3  text-sm font-semibold ">
              {event.date}
            </div>
            <div className="px-4 py-2">
              {event.event === "No scheduled reports" ? (
                <p className="">{event.event}</p>
              ) : (
                <div className="flex justify-between items-center ">
                  <span className="text-sm">{event.time}</span>
                  <span className="text-sm">{event.country}</span>
                  <span className="text-sm">{event.event}</span>
                  <span className="text-sm">{event.actual}</span>
                  <span className="text-sm">{event.forecast}</span>
                  <span className="text-sm">{event.prior}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-bold  mb-4">How to use Economic Calendar</h2>
        <p className=" mb-4">
          Economic Calendar on TradingView shows the latest and upcoming economic
          events that can affect certain assets, regions, and global markets —
          for example, <span className=" ">stocks</span>,{" "}
          <span className="">Forex</span>, or{" "}
          <span className="">bonds</span>.
        </p>
        <h3 className="text-lg font-semibold  mb-2">Frequently Asked Questions</h3>
        <div>
          <div className="flex justify-between items-center  px-4 py-2 rounded-md mb-2 cursor-pointer">
            <span className="">What is the Economic Calendar?</span>
            <span className="">+</span>
          </div>
          <div className="flex justify-between items-center  px-4 py-2 rounded-md cursor-pointer">
            <span className="text-white">
              How many countries does the Economic Calendar provide events for?
            </span>
            <span className="">+</span>
          </div>
        </div>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
};

export default TradeCalendar;
