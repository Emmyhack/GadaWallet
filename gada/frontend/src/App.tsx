import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './contexts/WalletContext';
import Navbar from './components/Navbar';
import LandingPageStitch from './pages/LandingPageStitch';
import Dashboard from './pages/Dashboard';
import AddHeir from './pages/AddHeir';
import ClaimAssets from './pages/ClaimAssets';
import UpdateActivity from './pages/UpdateActivity';
import BatchTransfer from './pages/BatchTransfer';
import Wallet from './pages/Wallet';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Swap from './pages/Swap';

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPageStitch />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-heir" element={<AddHeir />} />
              <Route path="/claim-assets" element={<ClaimAssets />} />
              <Route path="/update-activity" element={<UpdateActivity />} />
              <Route path="/batch-transfer" element={<BatchTransfer />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
              <Route path="/swap" element={<Swap />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
