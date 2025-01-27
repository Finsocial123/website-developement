

import { useState, useEffect } from 'react'
import { Settings, X, Minimize2 } from 'lucide-react'

// Mock service to simulate API calls
const fetchDealsData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate API response
  return {
    active: {
      deals: Math.floor(Math.random() * 10) + 1,
      amount: parseFloat((Math.random() * 10).toFixed(7)),
      percentage: Math.floor(Math.random() * (70 - 30) + 30)
    },
    unconfirmed: {
      deals: Math.floor(Math.random() * 25) + 10,
      amount: parseFloat((Math.random() * 20).toFixed(7)),
      percentage: Math.floor(Math.random() * (70 - 30) + 30)
    }
  }
}

export default function SafeDeals() {
  const [hoveredSection, setHoveredSection] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchDealsData()
        setData(result)
      } catch (err) {
        setError('Failed to fetch deals data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // SVG parameters
  const size = 200
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  if (loading) {
    return (
      <div className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg text-gray-200 font-medium">Safe deals</h2>
          <div className="flex items-center gap-2">
            <div className="animate-pulse w-4 h-4 bg-gray-700 rounded" />
            <div className="animate-pulse w-4 h-4 bg-gray-700 rounded" />
            <div className="animate-pulse w-4 h-4 bg-gray-700 rounded" />
          </div>
        </div>
        <div className="p-8">
          <div className="animate-pulse w-[200px] h-[200px] bg-gray-700 rounded-full mx-auto" />
          <div className="mt-8 space-y-4">
            <div className="animate-pulse h-12 bg-gray-700 rounded" />
            <div className="animate-pulse h-12 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-lg overflow-hidden p-4">
        <div className="text-red-400 text-center">{error}</div>
      </div>
    )
  }

  if (!data) return null

  const activeOffset = (data.active.percentage / 100) * circumference

  return (
    <div className="w-[400px] h-[500px] dark:bg-black dark:text-white text-black bg-white border-2 border-teal-500/20 hover:scale-105
    hover:shadow-2xl hover:border-teal-500/60 hover:border:z-10 group transition-all duration-300 ease-in-out 
    rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg  font-medium">Safe deals</h2>
        <div className="flex items-center gap-2">
          <button className=" hover:text-gray-200">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button className=" hover:text-gray-200">
            <Settings className="w-4 h-4" />
          </button>
          <button className=" hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-8">
        <div className="relative w-[200px] h-[200px] mx-auto">
          {/* SVG Donut Chart */}
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle (unconfirmed deals) */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#2a2a2a"
              strokeWidth={strokeWidth}
              onMouseEnter={() => setHoveredSection('unconfirmed')}
              onMouseLeave={() => setHoveredSection(null)}
              className="cursor-pointer"
            />
            {/* Active deals segment */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeDasharray={`${activeOffset} ${circumference}`}
              onMouseEnter={() => setHoveredSection('active')}
              onMouseLeave={() => setHoveredSection(null)}
              className="cursor-pointer transition-all duration-300"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className=" text-lg">
              {hoveredSection || 'unconfirmed'}
            </span>
            <span className=" text-3xl">
              {hoveredSection === 'active' ? data.active.deals : data.unconfirmed.deals}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 space-y-4">
          {/* Active Deals */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="flex-1">
              <p className="text-xl ">{data.active.amount.toFixed(7)} BTC</p>
              <p className="text-sm ">{data.active.deals} active deals</p>
            </div>
          </div>

          {/* Unconfirmed Deals */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="flex-1">
              <p className="text-xl ">{data.unconfirmed.amount.toFixed(7)} BTC</p>
              <p className="text-sm">{data.unconfirmed.deals} unconfirmed deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

