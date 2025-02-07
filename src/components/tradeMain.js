import { useState } from 'react'
import Header from './header'
import Sidebar from './sideBar'
import ConnectWallet from './ConnectWallet'
import MarketNavbar from './MarketNavbar'
import Historytrade from './Historytrade'
import PositionsTabletrade from './PositionTabletrade'
import TradingViewWidget from './TradingViewWidget'


export default function Trademain() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    
      <div className="min-h-screen bg-background text-foreground  dark:bg-black dark:text-white text-black bg-white">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex flex-col md:flex-row"> {/* Flex column for mobile, row for larger screens */}
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className="flex-1 p-2 md:p-4 "> {/* Adjust padding for mobile and larger screens */}
            <div className="flex flex-col md:flex-row gap-2 dark:bg-black dark:text-white text-black bg-white min-h-svh w-[1180px] mx-auto">
              <div className="md:w-1/4 lg:w-full "> {/* Sidebar adjustments */}
                <div>
                  <MarketNavbar />
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-2">
                  <Historytrade />
                  <TradingViewWidget />
                </div>
                  <PositionsTabletrade />
              </div>
              <div className="md:w-3/4"> {/* Adjust main content width */}
                  <ConnectWallet />
              </div>
            </div>
          </main>
        </div>
      </div>
    
  );
}
