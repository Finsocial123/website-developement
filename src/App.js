
import MainDashboard from './components/mainDashboard';
import MainWallet from './components/mainWallet';
import CoinDetails from './components/coinDetails';
import ManageTransactions from './components/manageTransactions';
import UserProfile from './components/userProfile';
import UserPortfolio from './components/userPortfolio';
import MarketCapital from './components/marketCapital';
import UpdateProfile from './components/updateProfile';


import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className='overflow-x-hidden'>
      <Router>
        <Routes>
          <Route path='/' element={<MainDashboard/>}/>
          <Route path='/wallet' element={<MainWallet/>}/>
          <Route path='/coins' element={<CoinDetails/>}/>
          <Route path='/transactions' element={<ManageTransactions/>}/>
          <Route path='/user' element={<UserProfile/>}/>
          <Route path='/portfolio' element={<UserPortfolio/>}/>
          <Route path='/market' element={<MarketCapital/>}/>
          <Route path='/update' element={<UpdateProfile/>}/>
          
          
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
