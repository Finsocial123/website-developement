

import { Search, Eye, MessageSquare, Bot, LineChart, Sun, Moon, Menu, Mic } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarRight from '../components/sideBarRight';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);

  const pages = [
    { name: 'Dashboard', path: '/' },
    { name: 'Wallet', path: '/wallet' },
    { name: 'Coin Details', path: '/coins' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Market Capital', path: '/market' },
    { name: 'Trading View', path: '/tradedash' },
    { name: 'Screener', path: '/screener' },
    { name: 'Trading Calendar', path: '/calendar' },
    { name: 'Buy & Sell Stock', path: '/buyandsell' },
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setFilteredPages(pages.filter(page => page.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredPages([]);
    }
  };

  const handlePageSelect = (path) => {
    navigate(path);
    setSearchQuery('');
    setFilteredPages([]);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b dark:bg-black dark:text-white text-black bg-white">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-muted rounded-lg">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <img src="" alt="Logo" className="h-8 w-8" />
          <span className="ml-2 font-bold text-xl dark:text-white text-black">Boltz</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 bg-muted rounded-full w-[300px] dark:bg-black dark:text-white text-black bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {filteredPages.length > 0 && (
            <ul className="absolute left-0 w-full bg-white dark:bg-black shadow-lg rounded-lg mt-1">
              {filteredPages.map((page) => (
                <li
                  key={page.path}
                  onClick={() => handlePageSelect(page.path)}
                  className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {page.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-muted rounded-lg">
          <Eye className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Mic className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-muted rounded-lg">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Bot className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <LineChart className="h-5 w-5" />
        </button>
        <button onClick={toggleTheme} className="p-2 hover:bg-muted rounded-lg">
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <SideBarRight isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
    </header>
  );
}
