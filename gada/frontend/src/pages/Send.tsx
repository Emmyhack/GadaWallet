import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {
  Send as SendIcon,
  ArrowLeft,
  Copy,
  Scan,
  Coins,
  CheckCircle,
  Zap,
  Shield,
  ChevronDown,
  Star,
  RefreshCw
} from 'lucide-react';

const Send = () => {
  const { connected } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('SOL');
  const [gasFee] = useState('0.000005');
  const [isLoading, setIsLoading] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState(false);

  const tokens = [
    { symbol: 'SOL', name: 'Solana', balance: '125.43', value: '$8,234.56', logo: null },
    { symbol: 'USDC', name: 'USD Coin', balance: '2,500.00', value: '$2,500.00', logo: null },
    { symbol: 'RAY', name: 'Raydium', balance: '45.67', value: '$1,234.56', logo: null }
  ];

  const recentRecipients = [
    { address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', name: 'Alice Wallet' },
    { address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', name: 'Bob Wallet' },
    { address: '3xZ7QvBhn4Xe1eUqPofCtnx5U2qcnnNkD5hLbJqR7sT9', name: 'Charlie Wallet' }
  ];

  const handleSend = async () => {
    if (!recipient || !amount) return;
    
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const selectRecipient = (address: string) => {
    setRecipient(address);
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <SendIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Connect to Send</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Connect your wallet to send tokens and manage your transactions securely.
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
      <div className="max-w-4xl mx-auto p-6">
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
              <h1 className="text-3xl font-bold text-white">Send Tokens</h1>
              <p className="text-white/60">Transfer tokens to another wallet securely</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipient Address */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Recipient Address</h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter wallet address or scan QR code"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-200">
                    <Scan className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Recent Recipients */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Recent Recipients</h4>
                  <div className="space-y-2">
                    {recentRecipients.map((recipient, index) => (
                      <button
                        key={index}
                        onClick={() => selectRecipient(recipient.address)}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between transition-all duration-200"
                      >
                        <div className="text-left">
                          <div className="text-white font-medium">{recipient.name}</div>
                          <div className="text-white/60 text-sm">{recipient.address.slice(0, 8)}...{recipient.address.slice(-8)}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyAddress(recipient.address);
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-200"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Amount and Token */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Amount & Token</h3>
              <div className="space-y-6">
                {/* Token Selection */}
                <div className="relative">
                  <button
                    onClick={() => setShowTokenSelector(!showTokenSelector)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white flex items-center justify-between transition-all duration-200 hover:bg-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold">{selectedToken}</span>
                    </div>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showTokenSelector && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 z-10">
                      <div className="space-y-2">
                        {tokens.map((token, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedToken(token.symbol);
                              setShowTokenSelector(false);
                            }}
                            className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center justify-between transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Coins className="w-5 h-5 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="text-white font-semibold">{token.symbol}</div>
                                <div className="text-white/60 text-sm">{token.name}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{token.balance}</div>
                              <div className="text-white/60 text-sm">{token.value}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-white font-semibold mb-3">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-2xl font-bold"
                    />
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200">
                      MAX
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-white/60 text-sm">
                    <span>Available: 125.43 {selectedToken}</span>
                    <span>≈ $8,234.56 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Transaction Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Network Fee</span>
                  <span className="text-white font-semibold">{gasFee} SOL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total Amount</span>
                  <span className="text-white font-semibold">
                    {amount ? `${parseFloat(amount) + parseFloat(gasFee)} ${selectedToken}` : `0 ${selectedToken}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Estimated Time</span>
                  <span className="text-white font-semibold">~2 seconds</span>
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
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2">
                    <Scan className="w-4 h-4" />
                    Scan QR Code
                  </div>
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Address
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

            {/* Security Info */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white/80 text-sm">Transaction encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/80 text-sm">Address verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-sm">Fast confirmation</span>
                </div>
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
                  <span className="text-white/60 text-sm">Gas Price</span>
                  <span className="text-white text-sm">5,000 lamports</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="mt-8">
          <button
            onClick={handleSend}
            disabled={!recipient || !amount || isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 animate-spin" />
                Processing Transaction...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <SendIcon className="w-5 h-5" />
                Send {amount ? `${amount} ${selectedToken}` : 'Tokens'}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;