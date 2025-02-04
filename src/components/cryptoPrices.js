import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CryptoPrices = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://saveai.tech/api/coins/?page=${currentPage}&items_per_page=100`,
          {
            headers: {
               'x-secret-code': 'finsocialdigitalsystemsscretcodes$$$!!!!@@#$$'
            }
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();

        setCoins(data.coins || []);
        setTotalPages(data.pagination.total_pages || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currentPage]);

  const handleCoinClick = (coinCode) => {
    navigate(`/bitcoin/${coinCode}`); // Navigate to Bitcoin.js with coin code
  };

  return (
    <div className="dark:bg-black dark:text-white text-black bg-white p-6 min-h-screen border-solid border-blue-300 md:border-opacity-50 rounded-3xl border-2 border-teal-500/20 hover:scale-100 hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Today's Cryptocurrency Prices by Market Cap
      </h1>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-teal-500 text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-700 px-2 py-1">Rank</th>
                  <th className="border border-gray-700 px-2 py-1">Name</th>
                  <th className="border border-gray-700 px-2 py-1">Price</th>
                  <th className="border border-gray-700 px-2 py-1">Hourly Change</th>
                  <th className="border border-gray-700 px-2 py-1">24h Change</th>
                  <th className="border border-gray-700 px-2 py-1">Weekly Change</th>
                  <th className="border border-gray-700 px-2 py-1">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.length > 0 ? (
                  coins.map((coin) => (
                    <tr
                      key={coin.code}
                      className="group hover:bg-black hover:text-white dark:hover:bg-gray-800 transition-all duration-300 ease-in-out space-y-4"
                    >
                      <td className="border border-gray-700 px-2 py-1">{coin.rank}</td>
                      <td className="px-2 py-1 flex items-center gap-2 border-b border-gray-700">
                        {/* Clickable Image & Name */}
                        <button
                          className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                          onClick={() => handleCoinClick(coin.code)}
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover:scale-150"
                          />
                          {coin.name}
                        </button>
                      </td>
                      <td className="border border-gray-700 px-2 py-1">${coin.price.toFixed(2)}</td>
                      <td className={`border border-gray-700 px-2 py-1 ${coin.changes.hour > 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.changes.hour > 0 ? "+" : ""}
                        {coin.changes.hour.toFixed(2)}%
                      </td>
                      <td className={`border border-gray-700 px-2 py-1 ${coin.changes.day > 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.changes.day > 0 ? "+" : ""}
                        {coin.changes.day.toFixed(2)}%
                      </td>
                      <td className={`border border-gray-700 px-2 py-1 ${coin.changes.week > 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.changes.week > 0 ? "+" : ""}
                        {coin.changes.week.toFixed(2)}%
                      </td>
                      <td className="border border-gray-700 px-2 py-1">${coin.cap.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-gray-400 py-2">
                      No coins data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoPrices;