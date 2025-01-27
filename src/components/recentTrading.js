// src/TradingDashboard.js


import { useState, useEffect } from 'react'
import { Settings, X, Minimize2 } from 'lucide-react'

// Mock service to simulate API calls
const fetchTradingActivities = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate API response with mock data
  return [
    { id: '126515', time: '17:24 AM', status: 'complete', amount: 0.00113, currency: 'BTC', type: 'positive' },
    { id: '123675', time: '18:14 AM', status: 'pending', amount: 3.90244, currency: 'LTC', type: 'positive' },
    { id: '126515', time: '20:25 AM', status: 'pending', amount: 0.00121, currency: 'LTC', type: 'negative' },
    { id: '159034', time: '21:24 AM', status: 'cancelled', amount: 0.01231, currency: 'BTC', type: 'positive' },
    { id: '136563', time: '21:50 AM', status: 'complete', amount: 0.6673, currency: 'DASH', type: 'negative' },
    { id: '177384', time: '21:59 PM', status: 'complete', amount: 0.97231, currency: 'BTC', type: 'negative' },
    { id: '173434', time: '22:11 PM', status: 'cancelled', amount: 9.2323, currency: 'LTC', type: 'positive' },
    { id: '1788348', time: '22:34 PM', status: 'pending', amount: 1.3433, currency: 'DASH', type: 'negative' },
    { id: '189915', time: '22:54 PM', status: 'complete', amount: 12.343, currency: 'LTC', type: 'positive' },
    { id: '179993', time: '23:05 PM', status: 'complete', amount: 0.23234, currency: 'LTC', type: 'positive' },
    { id: '184563', time: '23:15 PM', status: 'cancelled', amount: 1.4231, currency: 'BTC', type: 'negative' },
    { id: '186564', time: '23:50 PM', status: 'pending', amount: 2.3430, currency: 'DASH', type: 'positive' }
  ]
}

const StatusBadge = ({ status }) => {
  const colors = {
    complete: 'bg-green-500/20 text-green-500 border-green-500/20',
    pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20',
    cancelled: 'bg-red-500/20 text-red-500 border-red-500/20'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status}
    </span>
  )
}

export default function TradingActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchTradingActivities()
        setActivities(data)
      } catch (err) {
        setError('Failed to fetch trading activities')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh data every minute
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="w-full dark:bg-black dark:text-white text-black bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg  font-medium">Recent trading activities</h2>
          <div className="flex items-center gap-2">
            <div className="animate-pulse w-4 h-4  rounded" />
            <div className="animate-pulse w-4 h-4  rounded" />
            <div className="animate-pulse w-4 h-4 rounded" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse h-12 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full dark:bg-black dark:text-white text-black bg-white rounded-lg overflow-hidden p-4">
        <div className="text-red-400 text-center">{error}</div>
      </div>
    )
  }

  return (
    <div className="w-[800px] dark:bg-black dark:text-white text-black bg-white h-[500px] rounded-lg overflow-hidden border-t-4 border-blue-500">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg  font-medium">Recent trading activities</h2>
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

      {/* Table */}
      <div className="min-w-full">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium  border-b border-gray-800">
          <div>Deal ID Number</div>
          <div>Trade Time</div>
          <div>Status</div>
          <div>Last Trade</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-800">
          {activities.map((activity) => (
            <div
              key={`${activity.id}-${activity.time}`}
              className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-gray-800/50 transition-colors"
            >
              <div className="">
                Deal number {activity.id}
              </div>
              <div className="">
                {activity.time}
              </div>
              <div>
                <StatusBadge status={activity.status} />
              </div>
              <div className={`${
                activity.type === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {activity.type === 'positive' ? '+' : '-'} {activity.amount} {activity.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

