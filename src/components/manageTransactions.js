

import { useState } from "react"
import { ChevronDown, Download, Trash2, Info } from "lucide-react"
import Header from '../components/header'
import Sidebar from '../components/sideBar'

// Sample transaction data
const transactions = [
  {
    id: "Jav124578454132",
    date: "20 Dec 21",
    time: "12:20 AM",
    name: "Horew Doree",
    amount: 823,
    status: "Complete",
  },
  {
    id: "Jav124578412012",
    date: "18 Dec 21",
    time: "11:58 PM",
    name: "Karee Palu",
    amount: 1023,
    status: "Complete",
  },
  // Add more sample transactions as needed
]

const paymentMethods = [
  { name: "PayPal" },
  { name: "Mastercard" },
  { name: "Google Pay" },
  { name: "Amazon Pay" },
  { name: "Bitcoin" },
  { name: "Skrill" },
]

export default function ManageTransactions() {
  const [filter, setFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState("")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const filterOptions = ["All", "Complete", "Pending", "Deposit", "Outgoing"]

  return (
    <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className="flex">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className='flex-1 p-4 dark:bg-black dark:text-white text-black bg-white'>
    <div className="p-6 dark:bg-black dark:text-white text-black bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold ">Manage Transaction</h1>
        <div className="flex gap-4 dark:bg-black dark:text-white text-black bg-white">
          <input
            type="date"
            className="px-4 py-2 border rounded-lg dark:bg-black dark:text-white text-black bg-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium  mb-4">Make a Payment</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.name}
              className=" p-6 border-l-2 border-teal-500   rounded-3xl shadow-lg 
                    backdrop-blur-sm overflow-hidden group 
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:shadow-3xl hover:shadow-teal-500/30
                    hover:border-teal-500/60 hover:z-10 "
            >
              <span className="text-sm font-medium">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 -mb-px whitespace-nowrap ${
              filter === option ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="dark:text-white text-black rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-medium ">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Time</th>
              <th className="px-6 py-4 text-left text-sm font-medium ">Transaction ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium ">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium ">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium ">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-blue-500 dark:text-white text-black ">
                <td className="px-6 py-4 text-sm ">{transaction.date}</td>
                <td className="px-6 py-4 text-sm ">{transaction.time}</td>
                <td className="px-6 py-4 text-sm ">{transaction.id}</td>
                <td className="px-6 py-4 text-sm ">{transaction.name}</td>
                <td className="px-6 py-4 text-sm ">${transaction.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === "Complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 hover:text-blue-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-blue-600">
                      <Info className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </main>
        </div>
      </div>
  )
}

