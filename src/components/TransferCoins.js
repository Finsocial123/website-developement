import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransferCoins() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [address, setAddress] = useState('');

  const recentTransactions = [
    { amount: '1.23', currency: 'LTC', address: '0xeD1W3d', type: 'sent' },
    { amount: '0.03', currency: 'BTC', address: 'WallFKGDi', type: 'received' },
  ];

  const handleTransfer = (e) => {
    e.preventDefault();
    // Handle transfer logic here
    console.log({ amount, currency, address });
  };

  return (
    <div className="  h-[500px] w-[500px] p-6 rounded-3xl border mt-5 border-teal-500  hover:border-3 ring-8-offset    hover:scale-110  duration-300">
      <h3 className=" text-lg mb-4">Transfer Coins</h3>
      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Amount</label>
          <div className="flex">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="    Enter amount"
              className="flex-1 bg-gray-700 text-white px-[-5px] py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-700 text-white px-[-5px] py-2 rounded-r border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="LTC">LTC</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Transfer Now
        </button>
      </form>
      
      <div className="mt-6">
        <h4 className="text-sm mb-3">Recent Transactions</h4>
        {recentTransactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center space-x-2">
              {tx.type === 'sent' ? (
                <ArrowUpRight className="text-red-500" size={16} />
              ) : (
                <ArrowDownRight className="text-green-500" size={16} />
              )}
              <span className="text-white">{tx.amount} {tx.currency}</span>
            </div>
            <span className="text-gray-400 text-xs">{tx.address}</span>
          </div>
        ))}
      </div>
    </div>
  );
}