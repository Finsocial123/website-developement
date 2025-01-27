

import React, { useState, useEffect } from 'react';
import { ChevronUp, X, Settings, Minimize2 } from 'lucide-react';
import axios from 'axios';

const currencies = ['USD', 'EUR', 'CNY', 'GBP'];

export default function CryptoPrices() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Currency symbol mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    CNY: '¥',
    GBP: '£',
  };

  // Fetch live prices for specified cryptocurrencies
  const fetchCryptoPrices = async () => {
    try {
      const symbols = ['BTCUSDT', 'ETHUSDT', 'XMRUSDT', 'LTCUSDT', 'XRPUSDT', 'NEOUSDT', 'DASHUSDT'];
      const requests = symbols.map((symbol) =>
        axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
      );

      const responses = await Promise.all(requests);

      const updatedData = responses.map((response, index) => {
        const symbol = symbols[index].replace('USDT', ''); // Extract base symbol
        const name = getNameFromSymbol(symbol); // Map symbol to name
        const price = parseFloat(response.data.price);
        const change = getRandomChange(); // Mock change for now
        return { symbol, name, price, change };
      });

      setCryptoData(updatedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching crypto prices:', err.response ? err.response.data : err.message);
      setError('Failed to fetch crypto prices. Please try again.');
      setLoading(false);
    }
  };

  // Map symbol to name
  const getNameFromSymbol = (symbol) => {
    const names = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      XMR: 'Monero',
      LTC: 'Litecoin',
      NEO: 'NEO',
      DASH: 'Dash',
    };
    return names[symbol] || symbol;
  };

  // Mock price change percentage
  const getRandomChange = () => {
    return parseFloat((Math.random() * 10 - 5).toFixed(2)); // -5% to +5%
  };

  useEffect(() => {
    fetchCryptoPrices(); // Fetch prices on mount
    const interval = setInterval(fetchCryptoPrices, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-[400px] dark:bg-black dark:text-white text-black bg-white border-2 border-teal-500/20 h-[580px] 
      rounded-lg overflow-hidden hover:scale-105
      hover:shadow-2xl hover:border-teal-500/60 hover:border:z-10 group transition-all duration-300 ease-in-out ">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg dark:text-white text-black font-medium">Live crypto prices</h2>
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-gray-200">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-200">
            <Settings className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Currency Selector */}
      <div className="grid grid-cols-4 dark:bg-black dark:text-white text-black bg-white">
        {currencies.map((currency) => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={`py-2 text-center text-sm font-medium transition-colors dark:text-white text-black
              ${selectedCurrency === currency
                ? 'bg-[#2a2a2a] text-blue-400'
                : 'text-gray-600 hover:bg-[#2a2a2a]'
              }`}
          >
            {currency}
          </button>
        ))}
      </div>

      {/* Crypto List */}
      <div className="divide-y divide-gray-800">
        {loading ? (
          <div className="text-center p-4 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center p-4 text-red-500">{error}</div>
        ) : (
          cryptoData.map(({ symbol, name, price, change }) => (
            <div
              key={symbol}
              className="flex items-center justify-between p-3 hover:bg-[#252525] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6">
                  <img
                    src={`https://cryptologos.cc/logos/${name.toLowerCase()}-${symbol.toLowerCase()}-logo.png`}
                    alt={`${name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=24&width=24';
                    }}
                  />
                </div>
                <span className="dark:text-white text-black font-medium">{symbol}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-green-400">
                  {currencySymbols[selectedCurrency]} {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <ChevronUp className={`w-3 h-3 ${change >= 0 ? '' : 'rotate-180'}`} />
                  <span>({change.toFixed(2)}%)</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

