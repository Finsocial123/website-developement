

import { Search, Eye, MessageSquare, Bot, LineChart, Sun, Moon, Menu,Mic } from 'lucide-react'
import React ,{useState,useEffect} from 'react'


import SideBarRight from '../components/sideBarRight';

export default function Header({ onMenuClick }) {
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  


  useEffect(() => {
    // Add or remove the 'dark' class on the <html> element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b dark:bg-black dark:text-white
    text-black bg-white">
      {/* Left section */}
      <div className="flex items-center space-x-4 ">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <img 
            src="" 
            alt="Logo" 
            className="h-8 w-8"
          />
          <span className="ml-2 font-bold text-xl dark:text-white dark:bg-black text-black">Boltz</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-muted rounded-full w-[300px] 
            dark:bg-black dark:text-white text-black bg-white
            shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-muted rounded-lg">
          <Eye className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <button 
        onClick={toggleSidebar}
        className="p-2 hover:bg-muted rounded-lg">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Bot className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <LineChart className="h-5 w-5" />
        </button>

        
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <SideBarRight isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      
    </header>
  )
}

