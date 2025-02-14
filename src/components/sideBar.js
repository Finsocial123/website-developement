
import { LayoutDashboard, Wallet, Coins, ScrollText, PieChart, BarChart3,TrendingUp,LogOut, LineChart, Calendar,DollarSign, ChartCandlestick, ChartNoAxesCombined } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
const userData = {
  name: "Deepali khurana",
  
  
  isCollapsed: false,
};
export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Wallet, label: 'My Wallet', href: '/wallet' },
    { icon: Coins, label: 'Coin Details', href: '/coins' },
    { icon: ScrollText, label: 'Transactions', href: '/transactions' },
    { icon: PieChart, label: 'Portfolio', href: '/portfolio' },
    { icon: BarChart3, label: 'Market Capital', href: '/market' },
    { icon: TrendingUp, label: 'Trading View', href: '/tradedash' },
    { icon: LineChart, label: 'Screener', href: '/screener' },
    { icon: Calendar, label: 'Trading Calendar', href:'/calendar' },
    { icon: DollarSign, label: 'Buy & Sell Stock', href: '/buyandsell' },
    { icon:ChartCandlestick , label: 'Trade', href: '/trade' },
    { icon: ChartNoAxesCombined, label: 'Analytics', href: '/analytics' },
    { icon:LogOut , label: 'Log Out', href: '/logout' },
      
  ]
  const { name, email, isCollapse,profileImage } = userData;
   const navigate = useNavigate();

  return (
    <aside className={`
      bg-background border-r border-border  transition-all duration-300 dark:bg-black dark:text-white text-black bg-white
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Profile Section */}
      <div className="p-4 border-b border-border dark:bg-black dark:text-white text-black bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 -ml-12" />
          
          {!isCollapse && (
            <div className=" flex-1  overflow-hidden">
              
              <h3 className="font-medium truncate">Hello,{name}</h3>
              
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted 
            "
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      
      
    </aside>
  )
}

