
import { DollarSign, Bitcoin, Clock, TrendingUp } from 'lucide-react'

// Mock data - this would come from your API in production
const walletData = {
  totalBalance: {
    value: 12345.67,
    change: '+15%',
    period: 'from last month'
  },
  bitcoin: {
    value: 45000,
    change: '+2.5%',
    period: 'today'
  },
  ethereum: {
    value: 3200,
    change: '+1.8%',
    period: 'today'
  },
  portfolio: {
    value: '32%',
    period: 'Since last year'
  }
}

function MetricCard({ title, value, change, period, icon: Icon }) {
  return (
    <div className=" relative dark:bg-black dark:text-white text-black bg-white rounded-lg p-6 border-2 border-teal-500/20 shadow-lg 
                    backdrop-blur-sm overflow-hidden group 
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30
                    hover:border-teal-500/60 hover:z-10">
      {/* Glow effect */}
      <div className=" absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
      
      <div className="flex justify-between items-start mb-4">
        <span className="font-medium">{title}</span>
        <Icon className="text-teal-500 group-hover:scale-110 transition-transform duration-300" 
              size={20} />
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold  group-hover:text-teal-50 
                        transition-colors duration-300">
          {typeof value === 'number' ? value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          }) : value}
        </div>
        
        {change && (
          <div className="text-teal-400 text-sm font-medium group-hover:text-teal-300 
                          transition-colors duration-300 ">
            {change}
          </div>
        )}
        
        <div className=" text-sm group-hover:text-gray-400 
                        transition-colors duration-300">
          {period}
        </div>
      </div>
    </div>
  )
}

export default function WalletMetrics() {
  return (
    <div className=" dark:bg-black dark:text-white text-black bg-white p-6 relative w-[1080px] z-10 mx-auto">
      <div className="text-white w-[200px] text-center text-2xl font-bold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400">
          My Wallet
        </div>
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      
        <MetricCard
          title="Total Balance"
          value={walletData.totalBalance.value}
          change={walletData.totalBalance.change}
          period={walletData.totalBalance.period}
          icon={DollarSign}
        />
        
        <MetricCard
          title="Bitcoin"
          value={walletData.bitcoin.value}
          change={walletData.bitcoin.change}
          period={walletData.bitcoin.period}
          icon={Bitcoin}
        />
        
        <MetricCard
          title="Ethereum"
          value={walletData.ethereum.value}
          change={walletData.ethereum.change}
          period={walletData.ethereum.period}
          icon={Clock}
        />
        
        <MetricCard
          title="Portfolio Growth"
          value={walletData.portfolio.value}
          period={walletData.portfolio.period}
          icon={TrendingUp}
        />
      </div>
    </div>
  )
}



