import React, { useState } from 'react';
import WalletMetrics from '../components/walletMetrices';
import Charts from '../components/charts';
import Header from '../components/header'
import Sidebar from '../components/sideBar'
import NewsInsights from '../components/newsInsight';

const MainWallet = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false) 
    return (
        <div className="min-h-screen">
            <div className="min-h-screen bg-background text-foreground">
                <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
                <div className="flex">
                    <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
                    <main className='flex-1 p-4 dark:bg-black dark:text-white text-black bg-white '>
                    
                    <div>
                        <WalletMetrics/>
                        <Charts/>
                        <NewsInsights/>
                    </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default MainWallet;