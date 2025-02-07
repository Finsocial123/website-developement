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
import SignUp from './images/authentication/signUp';
import ForgetPassword from './images/authentication/forgetPassword';
import LoginPage from './images/authentication/loginPage';
import LogOut from './components/logOut';
import TradeMain from './components/tradeMain';
import AnalyticsPage from './components/AnalyticsPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='overflow-x-hidden'>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/logout' element={<LogOut/>}/>
          <Route path='/trade' element={<TradeMain/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
