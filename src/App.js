import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboard from './components/mainDashboard';
import MainWallet from './components/mainWallet';
import CoinDetails from './components/coinDetails';
import ManageTransactions from './components/manageTransactions';
import UserProfile from './components/userProfile';
import UserPortfolio from './components/userPortfolio';
import MarketCapital from './components/marketCapital';
import UpdateProfile from './components/updateProfile';
import TradingView from './components/tradingView';
import ScreenerMain from './components/screenerMain';
import TradeCalendar from './components/economicCalendar';
import BuySellStock from './components/buyAndSellStock';
import Bitcoin from './components/Bitcoin';
import SignUp from './authentication/signUp';
import ForgetPassword from './authentication/forgetPassword';
import LoginPage from './authentication/loginPage';
import LogOut from './components/logOut';
import TradeMain from './components/tradeMain';
import AnalyticsPage from './components/AnalyticsPage';
import ProtectedRoute from "./authentication/protectedRoute";

function App() {
  return (
    <Router>
      <div className='overflow-x-hidden'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/logout' element={<LogOut />} />
            <Route path='/trade' element={<TradeMain />} />
            <Route path='/dashboard' element={<MainDashboard />} />
            <Route path='/wallet' element={<MainWallet />} />
            <Route path='/coins' element={<CoinDetails />} />
            <Route path='/transactions' element={<ManageTransactions />} />
            <Route path='/user' element={<UserProfile />} />
            <Route path='/portfolio' element={<UserPortfolio />} />
            <Route path='/market' element={<MarketCapital />} />
            <Route path='/update' element={<UpdateProfile />} />
            <Route path='/tradedash' element={<TradingView />} />
            <Route path='/screener' element={<ScreenerMain />} />
            <Route path='/calendar' element={<TradeCalendar />} />
            <Route path='/buyandsell' element={<BuySellStock />} />
            <Route path="/bitcoin/:coinCode" element={<Bitcoin />} />
            <Route path='/analytics' element={<AnalyticsPage />} />
          </Route>

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
