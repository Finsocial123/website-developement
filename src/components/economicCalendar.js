import { useState } from 'react'
import { ThemeProvider  } from 'next-themes'

import Header1 from './header'
import Sidebar1 from './sideBar'
import TradeCalendar from './tradeCalendar'


export default function BuySellStockmain() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header1 onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar1 isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          
           <main className='flex-1 p-4 dark:bg-black dark:text-white text-black bg-white'>
            <TradeCalendar/>
          
          
          </main>
        </div>
      </div>
      
    </ThemeProvider>
  )
}