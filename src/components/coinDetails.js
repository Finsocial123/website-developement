import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header'
import Sidebar from '../components/sideBar'

const CoinDetails = () => {
  // State to store all coin data, coin images, loading state, and error state
  const [coinData, setCoinData] = useState([]);
  const [coinImages, setCoinImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20); // Number of coins to show per page

  // Fetch function to get all coin data
  const fetchCoinData = async () => {
    try {
      // Make a GET request to Binance API for all symbols
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

      // Set coin data to state
      setCoinData(response.data);
      setLoading(false);

      // Fetch coin images
      const images = {};
      response.data.forEach((coin) => {
        const coinName = coin.symbol.slice(0, -4).toLowerCase(); // Remove "USDT" from the symbol and convert to lowercase
        images[coin.symbol] = `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${coinName}.webp`;
      });

      setCoinImages(images);
    } catch (err) {
      console.error('Error fetching coin data:', err);
      setError('Failed to fetch coin data');
      setLoading(false);
    }
  };

  // Fetch data initially and set up interval to refresh data every 10 seconds
  useEffect(() => {
    fetchCoinData(); // Fetch data once on mount

    const intervalId = setInterval(() => {
      fetchCoinData(); // Refresh every 5 seconds
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Calculate which coins to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const selectedCoins = coinData.slice(startIndex, startIndex + pageSize);

  // Function to handle page changes
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(coinData.length / pageSize);

  return (

    <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className='flex-1 p-4 dark:bg-black dark:text-white text-black bg-white'>
    <div className="min-h-screen dark:bg-black dark:text-white text-black bg-white p-4">
      <div className="max-w-6xl mx-auto shadow-lg p-6 space-y-4 rounded-3xl border-2 border-teal-500">
        <h2 className="text-2xl font-bold text-center">All Coin Prices</h2>

        {/* Loading or Error States */}
        {loading && <div className="text-center text-lg">Loading...</div>}
        {error && <div className="text-center text-lg text-red-500">{error}</div>}

        {/* Display coin data in a table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-teal-500 text-white rounded-3xl">
                <tr>
                  <th className="px-4 py-2 border-teal-500 border-2">Image</th>
                  <th className="px-4 py-2 border-teal-500 border-2">Symbol</th>
                  <th className="px-4 py-2 border-teal-500 border-2">Price (USDT)</th>
                  <th className="px-4 py-2 border-teal-500 border-2">Change (%)</th>
                </tr>
              </thead>
              <tbody>
                {selectedCoins.map((coin, index) => (
                  <tr key={index} className="hover:bg-blue-400">
                    <td className="px-4 py-2 border-teal-500 border-2">
                      <img
                        src={coinImages[coin.symbol] || '/placeholder-image.png'}
                        alt={coin.symbol}
                        className="w-8 h-8"
                      />
                    </td>
                    <td
                      className="px-4 py-2 border-teal-500 border-2 hover:scale-105 transform transition duration-200 ease-in-out"
                    >
                      {coin.symbol}
                    </td>
                    <td className="px-4 py-2 border-teal-500 border-2 text-green-500">{coin.lastPrice} USDT</td>
                    <td className="px-4 py-2 border-teal-500 border-2 text-red-600">{coin.priceChangePercent} %</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-3xl"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-teal-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-3xl"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </main>
        </div>
      </div>
  );
};

export default CoinDetails;
