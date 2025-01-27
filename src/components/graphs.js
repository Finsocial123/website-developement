import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: "January", series1: 20, series2: 30 },
  { month: "February", series1: 40, series2: 55 },
  { month: "March", series1: 60, series2: 55 },
  { month: "April", series1: 80, series2: 10 },
  { month: "May", series1: 70, series2: 85 },
  { month: "June", series1: 90, series2: 0 },
  { month: "July", series1: 65, series2: 100 },
]

export default function MarketTrends() {
  return (
    <div className="w-full p-6 dark:bg-black dark:text-white text-black bg-white rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">Market Pulse</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis 
              dataKey="month" 
              stroke="#666666"
              tick={{ fill: '#666666' }}
            />
            <YAxis 
              stroke="#666666"
              tick={{ fill: '#666666' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2D2D2D',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="series1"
              stroke="rgb(59, 130, 246)"
              strokeWidth={3}
              dot={{ fill: "rgb(59, 130, 246)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="series2"
              stroke="rgb(249, 115, 22)"
              strokeWidth={3}
              dot={{ fill: "rgb(249, 115, 22)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}