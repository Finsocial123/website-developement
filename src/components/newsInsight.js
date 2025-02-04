import React, { useState, useEffect } from "react";

const NewsInsights = () => {
  const [news, setNews] = useState({
    crypto: [],
    finance: [],
    trading: [],
    marketImpact: [],
    forex: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOtherNews, setShowOtherNews] = useState(false);

  const fetchNews = async () => {
    const API_ENDPOINT = "http://saveai.tech/api/news/all";
    const SECRET_CODE = process.env.REACT_APP_SECRET_KEY;

    console.log("Secret Code:", SECRET_CODE);


    console.log("Fetching news...");
    console.log("API URL:", API_ENDPOINT);
    console.log("Secret Key:", SECRET_CODE);

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "GET",
        headers: {
          'x-secret-code': 'finsocialdigitalsystemsscretcodes$$$!!!!@@#$$',
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setNews({
        crypto: data.crypto || [],
        finance: data.finance || [],
        trading: data.trading || [],
        marketImpact: data.market_impact || [], // Fixed key name
        forex: data.forex || [],
      });
    } catch (error) {
      console.error("Error fetching API:", error);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderNewsCategory = (category, articles) => (
    <div className="mb-12">
      <h2 className="text-2xl font-extrabold mb-6 border-l-4 border-blue-500 pl-3">
        {category}
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.length > 0 ? (
          articles.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-3xl overflow-hidden hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="h-40 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title || "News Image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200?text=No+Image"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-5 dark:bg-black dark:text-white text-black bg-white border border-teal-500 rounded-3xl hover:scale-105">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {item.title || "No Title Available"}
                </h3>
                <p className="text-sm line-clamp-3 mb-4">
                  {item.description || "No Description Available"}
                </p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-700 font-medium hover:text-blue-800"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No articles available.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-7 dark:bg-black dark:text-white text-black bg-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Latest News</h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg animate-pulse">Loading news...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-16">
          {renderNewsCategory("Crypto News", news.crypto)}
          {renderNewsCategory("Finance News", news.finance)}
          {renderNewsCategory("Trading News", news.trading)}

          <div className="text-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowOtherNews(!showOtherNews)}
            >
              {showOtherNews ? "Hide Other News" : "Show Other News"}
            </button>
          </div>

          {showOtherNews && (
            <>
              {renderNewsCategory("Market Impact News", news.marketImpact)} 
              {renderNewsCategory("Forex News", news.forex)}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsInsights;
