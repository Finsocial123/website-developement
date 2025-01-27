



import { Settings, X, Minimize2, ArrowRight, ArrowLeft } from 'lucide-react'

const transactions = [
  {
    id: 1,
    type: 'sent',
    amount: '1.23',
    currency: 'LTC',
    from: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    },
    to: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    }
  },
  {
    id: 2,
    type: 'received',
    amount: '0.03',
    currency: 'BTC',
    from: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    },
    to: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    }
  },
  {
    id: 3,
    type: 'sent',
    amount: '0.5',
    currency: 'ETH',
    from: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    },
    to: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    }
  },
  {
    id: 4,
    type: 'received',
    amount: '100',
    currency: 'XRP',
    from: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    },
    to: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    }
  },
  {
    id: 5,
    type: 'sent',
    amount: '2.5',
    currency: 'LTC',
    from: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    },
    to: {
      avatar: '/placeholder.svg?height=32&width=32',
      address: '0xsD1...'
    }
  }
]

export default function RecentTransactions() {
  return (
    <div className="w-[400px] h-[300px] dark:bg-black dark:text-white text-black bg-white rounded-lg overflow-hidden border-l-4 border-blue-500">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg  font-medium">Recent Transaction</h2>
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

      {/* Transactions List */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3">
            {/* From */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${
              transaction.type === 'sent' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-400'
                : 'bg-[#252525]'
            }`}>
              <img
                src={transaction.from.avatar || "/placeholder.svg"}
                alt="User avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className={`text-sm font-medium ${
                transaction.type === 'sent' ? 'text-white' : 'text-gray-300'
              }`}>
                {transaction.amount} {transaction.currency}
              </span>
            </div>

            {/* Arrow */}
            {transaction.type === 'sent' ? (
              <ArrowRight className="w-5 h-5 text-red-400" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-green-400" />
            )}

            {/* To */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#252525]">
              <img
                src={transaction.to.avatar || "/placeholder.svg"}
                alt="User avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-200">{transaction.to.address}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full text-center text-sm text-gray-400 hover:text-gray-200">
          + View all
        </button>
      </div>
    </div>
  )
}

