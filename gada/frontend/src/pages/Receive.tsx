import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {
  Download,
  ArrowLeft,
  Copy,
  Share2,
  QrCode,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Star,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

const Receive = () => {
  const { connected, wallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('Solana');

  const networks = [
    { name: 'Solana', icon: '⚡', address: wallet?.publicKey?.toString() || 'Not connected' },
    { name: 'Ethereum', icon: '🔷', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' },
    { name: 'Polygon', icon: '🟣', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' }
  ];

  const copyAddress = async () => {
    if (wallet?.publicKey) {
      await navigator.clipboard.writeText(wallet.publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareAddress = async () => {
    if (wallet?.publicKey && navigator.share) {
      try {
        await navigator.share({
          title: 'My Wallet Address',
          text: `Send tokens to: ${wallet.publicKey.toString()}`,
          url: `https://explorer.solana.com/address/${wallet.publicKey.toString()}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Download className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Connect to Receive</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Connect your wallet to generate your unique address and QR code for receiving tokens.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/wallet"
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Receive Tokens</h1>
              <p className="text-white/60">Share your address to receive tokens securely</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* QR Code Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your QR Code</h2>
                <p className="text-white/60">Scan this QR code to send tokens to your wallet</p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 text-white/20" />
                      <p className="text-white/60 text-sm mt-4">QR Code Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/60 text-sm mb-4">Supported by all major wallet apps</p>
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2 text-white/60">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm">Mobile</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm">Desktop</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Tablet className="w-4 h-4" />
                    <span className="text-sm">Tablet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Your Wallet Address</h3>
              
              <div className="space-y-6">
                {/* Network Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3">Select Network</label>
                  <div className="grid grid-cols-3 gap-3">
                    {networks.map((network, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedNetwork(network.name)}
                        className={`p-4 rounded-2xl border transition-all duration-200 ${
                          selectedNetwork === network.name
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500 text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-2">{network.icon}</div>
                        <div className="text-sm font-semibold">{network.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Display */}
                <div>
                  <label className="block text-white font-semibold mb-3">Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={networks.find(n => n.name === selectedNetwork)?.address || ''}
                      readOnly
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      onClick={copyAddress}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-200"
                    >
                      {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-white/60 text-sm">
                      {formatAddress(networks.find(n => n.name === selectedNetwork)?.address || '')}
                    </span>
                    <button
                      onClick={shareAddress}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 border border-white/20"
                    >
                      <Share2 className="w-4 h-4 inline mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Security Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Address Verification</h4>
                      <p className="text-white/60 text-sm">Always verify the address before sending tokens</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Secure Connection</h4>
                      <p className="text-white/60 text-sm">Your address is encrypted and secure</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Network Compatibility</h4>
                      <p className="text-white/60 text-sm">Ensure you're using the correct network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Fast Transactions</h4>
                      <p className="text-white/60 text-sm">Receive tokens in seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={copyAddress}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </div>
                </button>
                <button 
                  onClick={shareAddress}
                  className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Address
                  </div>
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Save Contact
                  </div>
                </button>
              </div>
            </div>

            {/* Network Status */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Network Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Solana Network</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm font-semibold">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Block Height</span>
                  <span className="text-white text-sm">234,567,890</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Network Fee</span>
                  <span className="text-white text-sm">~0.000005 SOL</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Incoming</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">+50.00 SOL</div>
                      <div className="text-white/60 text-xs">2 hours ago</div>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Download className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">+1,000 USDC</div>
                      <div className="text-white/60 text-xs">1 day ago</div>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">💡 Pro Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="text-white/80">
                  • Double-check the address before sending
                </div>
                <div className="text-white/80">
                  • Use QR codes for mobile wallets
                </div>
                <div className="text-white/80">
                  • Keep your private key secure
                </div>
                <div className="text-white/80">
                  • Verify network compatibility
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;