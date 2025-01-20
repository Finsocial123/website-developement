import React, { useState } from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [activeTab, setActiveTab] = useState('notes');

  const tabContent = {
    notes: "Here are your latest notes...",
    alerts: "You have 3 new alerts!",
    chats: "Recent chats will appear here."
  };

  return (
  <>
    

    <div
      className={`fixed  z-50 top-0 right-0 h-full w-[370px] bg-white dark:bg-black border-l-2 dark:border-white border-gray-900 text-black dark:text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Interactions</h2>
        <div className="flex mb-4">
          {['notes', 'alerts', 'chats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-2 capitalize ${
                activeTab === tab
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-2">{tabContent[activeTab]}</div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;

