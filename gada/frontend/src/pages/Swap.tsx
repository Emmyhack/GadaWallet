import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Settings,
  CheckCircle,
  Zap,
  Shield,
  ChevronDown,
  BarChart3,
  Coins,
  ArrowUpDown,
  Info
} from 'lucide-react';

const Swap = () => {
  const { connected } = useWallet();
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState<'from' | 'to' | null>(null);

  const tokens = [
    { symbol: 'SOL', name: 'Solana', balance: '125.43', value: '$8,234.56', logo: null, price: 65.67, change: '+5.2%' },
    { symbol: 'USDC', name: 'USD Coin', balance: '2,500.00', value: '$2,500.00', logo: null, price: 1.00, change: '+0.1%' },
    { symbol: 'RAY', name: 'Raydium', balance: '45.67', value: '$1,234.56', logo: null, price: 27.05, change: '+8.7%' },
    { symbol: 'SRM', name: 'Serum', balance: '100.00', value: '$50.00', logo: null, price: 0.50, change: '-2.1%' }
  ];

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;
    
    setIsLoading(true);
    // Simulate swap
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  const switchTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const selectToken = (token: string) => {
    if (showTokenSelector === 'from') {
      setFromToken(token);
    } else if (showTokenSelector === 'to') {
      setToToken(token);
    }
    setShowTokenSelector(null);
  };

  const getTokenBalance = (symbol: string) => {
    return tokens.find(t => t.symbol === symbol)?.balance || '0';
  };

  const getTokenPrice = (symbol: string) => {
    return tokens.find(t => t.symbol === symbol)?.price || 0;
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ArrowRight className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Connect to Swap</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Connect your wallet to swap tokens and access the best rates across all DEXs.
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/wallet"
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Swap Tokens</h1>
                <p className="text-white/60">Get the best rates across all DEXs</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Swap Interface */}
          <div className="lg:col-span-2 space-y-8">
            {/* Swap Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <div className="space-y-6">
                {/* From Token */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-white font-semibold">From</label>
                    <div className="text-white/60 text-sm">
                      Balance: {getTokenBalance(fromToken)} {fromToken}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowTokenSelector('from')}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all duration-200 border border-white/20"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">{fromToken}</span>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="number"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-white text-2xl font-bold placeholder-white/50 focus:outline-none"
                      />
                      <div className="text-white/60 text-sm">
                        ≈ ${fromAmount ? (parseFloat(fromAmount) * getTokenPrice(fromToken)).toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Switch Button */}
                <div className="flex justify-center">
                  <button
                    onClick={switchTokens}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </button>
                </div>

                {/* To Token */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-white font-semibold">To</label>
                    <div className="text-white/60 text-sm">
                      Balance: {getTokenBalance(toToken)} {toToken}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowTokenSelector('to')}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all duration-200 border border-white/20"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">{toToken}</span>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="number"
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-white text-2xl font-bold placeholder-white/50 focus:outline-none"
                      />
                      <div className="text-white/60 text-sm">
                        ≈ ${toAmount ? (parseFloat(toAmount) * getTokenPrice(toToken)).toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swap Details */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Swap Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Exchange Rate</span>
                      <span className="text-white font-semibold">
                        1 {fromToken} = {(getTokenPrice(toToken) / getTokenPrice(fromToken)).toFixed(4)} {toToken}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Price Impact</span>
                      <span className="text-green-400 font-semibold">0.12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Network Fee</span>
                      <span className="text-white font-semibold">~0.000005 SOL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Slippage Tolerance</span>
                      <span className="text-white font-semibold">{slippage}%</span>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  onClick={handleSwap}
                  disabled={!fromAmount || !toAmount || isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 disabled:transform-none disabled:shadow-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Swap...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <ArrowRight className="w-5 h-5" />
                      Swap {fromAmount ? `${fromAmount} ${fromToken}` : 'Tokens'}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Swap Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-3">Slippage Tolerance</label>
                    <div className="flex gap-2">
                      {['0.5', '1.0', '2.0'].map((value) => (
                        <button
                          key={value}
                          onClick={() => setSlippage(value)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                            slippage === value
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {value}%
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-3">Custom Slippage</label>
                    <input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="0.5"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Market Overview */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Market Overview</h3>
              <div className="space-y-3">
                {tokens.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{token.symbol}</div>
                        <div className="text-white/60 text-sm">${token.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {token.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Price Chart</h3>
              <div className="h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Chart Placeholder</p>
                </div>
              </div>
            </div>

            {/* Best Routes */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Best Routes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white text-sm">Raydium</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">Best Rate</div>
                    <div className="text-green-400 text-xs">0.12% impact</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Info className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-white text-sm">Orca</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">Alternative</div>
                    <div className="text-yellow-400 text-xs">0.18% impact</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white/80 text-sm">Audited contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/80 text-sm">No custody risk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-sm">Instant execution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Selector Modal */}
        {showTokenSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Select Token</h3>
                <button
                  onClick={() => setShowTokenSelector(null)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {tokens.map((token, index) => (
                  <button
                    key={index}
                    onClick={() => selectToken(token.symbol)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between transition-all duration-200"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Swap;