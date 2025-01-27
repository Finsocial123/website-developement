



import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const defaultChartData = [
  { name: 'Jan', Bitcoin: 45000, Ethereum: 3000 },
  { name: 'Feb', Bitcoin: 47000, Ethereum: 3200 },
  { name: 'Mar', Bitcoin: 50000, Ethereum: 3400 },
  { name: 'Apr', Bitcoin: 48000, Ethereum: 3300 },
  { name: 'May', Bitcoin: 52000, Ethereum: 3600 },
  { name: 'Jun', Bitcoin: 54000, Ethereum: 3800 },
]



export default function Dashboard() {
  const [activeCrypto, setActiveCrypto] = useState('Bitcoin')
  const [chartData] = useState(defaultChartData)
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  w-[1080px] mx-auto  ">
      <div className="lg:col-span-3 dark:bg-black dark:text-white text-black bg-white rounded-lg border-2
      w-[1000px] border-teal-500/20 p-6 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/50 hover:border-teal-500/80 hover:z-10 shadow-2xl">
        <h2 className="text-2xl font-bold  mb-4">Cryptocurrency Charts</h2>
        <div className="flex gap-2 mb-4">
          {['Bitcoin', 'Ethereum'].map((crypto) => (
            <button
              key={crypto}
              onClick={() => setActiveCrypto(crypto)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeCrypto === crypto
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {crypto}
            </button>
          ))}
        </div>
        <div className="h-80">
          <ResponsiveContainer width="80%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey={activeCrypto}
                stroke="#14b8a6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  )
}

