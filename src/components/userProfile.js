import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Graphs from '../components/graphs';
import Header from '../components/header';
import Sidebar from '../components/sideBar';
import userImage from '../images/team2.jpeg';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Loading...',
    id: 'Loading...',
    email: 'Loading...',
  });

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://5.189.130.39:8000/api/auth/signup');
        if (response.ok) {
          const data = await response.json();
          setUserData({
            username: data.username || 'Unknown',
            id: data.id || 'Unknown',
            email: data.email || 'Unknown',
          });
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

          {/* Main Content */}
          <main className="flex-1 p-4 dark:bg-black dark:text-white text-black bg-white ">
            {/* Profile Section */}
            <div className="mb-6 flex justify-between dark:bg-black dark:text-white text-black bg-white w-[1080px] mx-auto ">
              <div className="w-[300px] gap-16 flex p-4 rounded-3xl border-2 border-teal-500/20 hover:scale-105 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                <div>
                  <h2 className="text-xl font-semibold mb-3">{userData.username}</h2>
                  <p className="text-sm text-gray-400">{userData.email}</p>
                </div>
                <div>
                  <img
                    src={userImage}
                    alt="Profile"
                    className="rounded-full w-14 h-14 border-2 border-gray-600 cursor-pointer"
                    onClick={() => navigate('/update')}
                  />
                </div>
              </div>
              <div className="flex gap-4 h-[55px] rounded-3xl px-3 text-center">
                {[
                  { label: 'ID', value: userData.id },
                  { label: 'Membership', value: 'Premium' },
                  { label: 'User Type', value: 'Trader' },
                  { label: 'Following', value: 128 },
                  { label: 'Followers', value: 456 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="dark:bg-black dark:text-white text-black bg-white px-6 py-2 rounded-3xl text-sm font-medium border-2 border-teal-500/20 hover:scale-105 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out"
                  >
                    <span>{item.label}</span>
                    <span className="block text-sm text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Section */}
            <div className="dark:bg-black dark:text-white text-black bg-white p-4 rounded-3xl mb-6 h-[190px] border-2 border-teal-500/20 hover:scale-105 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out w-[1080px] mx-auto">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">Balance Information</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline gap-2 pt-3">
                      <span className="text-xl font-bold text-orange-400">$192,384.00</span>
                      <span className="text-md text-white">BTC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-md text-gray-400">Today's PnL</span>
                      <span className="text-sm text-red-400">-10.44%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {['Deposit', 'Withdraw', 'Cash In'].map((action) => (
                    <button
                      key={action}
                      className="dark:bg-black dark:text-white text-black bg-white px-8 py-2 rounded-3xl border-2 border-teal-500/20  
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Markets and Stories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[1080px] mx-auto">
              <div className="lg:col-span-2">
                <div className="dark:bg-black dark:text-white text-black bg-white p-4 rounded-3xl h-full min-h-[250px] border-2 border-teal-500/20  hover:scale-105 
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <Graphs />
                </div>
              </div>
              <div className="space-y-10">
                {/* Referrals and Rewards Section */}
                <div className="dark:bg-black dark:text-white text-black bg-white p-4 rounded-3xl min-h-[200px] border-2 border-teal-500/20 hover:scale-105 
                   hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <h3 className="text-lg font-medium text-center mb-4">Referrals and Rewards</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>💰 Earn $50 for every friend who joins.</li>
                    <li>🎁 Unlock rewards for your first 5 referrals.</li>
                    <li>🌟 Special premium reward for 10+ referrals.</li>
                    <li>📈 Total Rewards Earned: <span>$150</span></li>
                  </ul>
                </div>
                {/* Announcements Section */}
                <div className="dark:bg-black dark:text-white text-black bg-white p-4 rounded-3xl min-h-[200px] border-2 border-teal-500/20 hover:scale-105 
                                 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
                  <h3 className="text-lg font-medium text-center mb-4">Announcements</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>🚀 New feature update coming next week.</li>
                    <li>📢 Join our webinar on January 25th at 6 PM.</li>
                    <li>📊 Quarterly performance report is now available.</li>
                    <li>⚠️ Scheduled maintenance on January 30th, 12 AM - 4 AM.</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Navbar;