import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function TransferForm() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('BTC')
  
  const coins = ['BTC', 'LTC', 'DASH', 'Ripple']

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectCoin = (coin) => {
    setSelectedCoin(coin)
    setIsOpen(false)
  }

  return (
    <div className="w-[400px] dark:bg-black dark:text-white bg-white rounded-lg p-4 border-l-4 border-blue-500
     text-black transition-all duration-300 ease-in-out overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Wallet Addresses</h2>
        <button 
          onClick={toggleExpand}
          className="p-1 hover:bg-gray-700 rounded transition-transform duration-300 ease-in-out"
        >
          <ChevronUp className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Form - Only shown when expanded */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-4 mt-6">
          <div>
            <label className="text-gray-400 text-sm">Bitcoin wallet address</label>
            <div className="mt-1 relative">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                  $
                </span>
                <input
                  type="text"
                  placeholder="OxsD12F32xvW3deG5..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-none px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={toggleDropdown}
                  className="inline-flex items-center px-3 border border-l-0 border-gray-600 bg-gray-700 rounded-r-md hover:bg-gray-600"
                >
                  <span className="mr-1">{selectedCoin}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10">
                  {coins.map((coin) => (
                    <button
                      key={coin}
                      onClick={() => selectCoin(coin)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600 first:rounded-t-md last:rounded-b-md"
                    >
                      {coin}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Litecoin wallet address</label>
            <div className="mt-1 flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="0xsD12F32xvW3deG5..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-r-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  )
}

