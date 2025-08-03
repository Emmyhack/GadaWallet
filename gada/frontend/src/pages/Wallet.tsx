import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import {
  Wallet as WalletIcon,
  Copy,
  ExternalLink,
  QrCode,
  RefreshCw,
  Send,
  Download,
  ArrowRight,
  Plus,
  Coins,
  History,
  Settings,
  Shield,
  Key,
  Eye,
  EyeOff,
  Trash2,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Wallet = () => {
  const { connected, wallet, connect, disconnect } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [balance] = useState('0.00');
  const [portfolioValue] = useState('$12,345.67');
  const [portfolioChange] = useState('+12.5%');
  const [isPositive] = useState(true);

  const tokens = [
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: '125.43',
      value: '$8,234.56',
      change: '+5.2%',
      logo: null
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '2,500.00',
      value: '$2,500.00',
      change: '+0.1%',
      logo: null
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      balance: '45.67',
      value: '$1,234.56',
      change: '+8.7%',
      logo: null
    }
  ];

  const transactions = [
    {
      type: 'receive',
      amount: '50.00',
      token: 'SOL',
      timestamp: Date.now() - 3600000,
      hash: '0x1234...5678',
      status: 'confirmed'
    },
    {
      type: 'send',
      amount: '25.00',
      token: 'SOL',
      timestamp: Date.now() - 7200000,
      hash: '0x8765...4321',
      status: 'confirmed'
    },
    {
      type: 'swap',
      amount: '100.00',
      token: 'USDC',
      timestamp: Date.now() - 10800000,
      hash: '0xabcd...efgh',
      status: 'confirmed'
    }
  ];

  const copyAddress = () => {
    if (wallet?.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey.toString());
    }
  };

  const viewOnExplorer = () => {
    if (wallet?.publicKey) {
      window.open(`https://explorer.solana.com/address/${wallet.publicKey.toString()}`, '_blank');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'receive':
        return <Download className="w-5 h-5 text-green-500" />;
      case 'send':
        return <Send className="w-5 h-5 text-red-500" />;
      case 'swap':
        return <ArrowRight className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <WalletIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Connect your wallet to access your portfolio, manage assets, and explore DeFi opportunities.
          </p>
          <button
            onClick={connect}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">GadaWallet</h1>
                <p className="text-white/60">Your Digital Asset Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={copyAddress}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border border-white/20"
              >
                <Copy className="w-4 h-4" />
                {wallet?.publicKey && formatAddress(wallet.publicKey.toString())}
              </button>
              <button
                onClick={viewOnExplorer}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 border border-white/20">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Portfolio Value</h2>
              <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-200">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="text-4xl font-bold text-white mb-2">{portfolioValue}</div>
            <div className={`flex items-center gap-2 text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              {portfolioChange}
            </div>
            <div className="mt-6 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-white/60 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Portfolio Chart</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Link
                to="/send"
                className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-6 h-6" />
                <span className="font-semibold">Send</span>
              </Link>
              <Link
                to="/receive"
                className="group bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                <Download className="w-6 h-6" />
                <span className="font-semibold">Receive</span>
              </Link>
              <Link
                to="/swap"
                className="group bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                <ArrowRight className="w-6 h-6" />
                <span className="font-semibold">Swap</span>
              </Link>
              <button className="group bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-white/20 w-full">
                <Plus className="w-6 h-6" />
                <span className="font-semibold">Buy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'tokens'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Tokens
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'history'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <History className="w-5 h-5" />
                History
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </div>
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Total Balance</h4>
                      <p className="text-white/60 text-sm">SOL</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{balance}</div>
                  <div className="text-green-400 text-sm">+2.5% today</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">USD Value</h4>
                      <p className="text-white/60 text-sm">Total</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{portfolioValue}</div>
                  <div className="text-green-400 text-sm">+12.5% this week</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Active Tokens</h4>
                      <p className="text-white/60 text-sm">Count</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{tokens.length}</div>
                  <div className="text-blue-400 text-sm">+1 this month</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.type === 'receive' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <div className="text-white font-semibold capitalize">{tx.type}</div>
                          <div className="text-white/60 text-sm">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          tx.type === 'receive' ? 'text-green-400' : 'text-white'
                        }`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token}
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          {getStatusIcon(tx.status)}
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tokens Tab */}
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              {tokens.map((token, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        {token.logo ? (
                          <img src={token.logo} alt={token.symbol} className="w-8 h-8" />
                        ) : (
                          <Coins className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">{token.symbol}</div>
                        <div className="text-white/60">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-lg">{token.balance}</div>
                      <div className="text-white/60">{token.value}</div>
                      <div className="text-green-400 text-sm">{token.change}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {transactions.map((tx, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tx.type === 'receive' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="text-white font-semibold capitalize">{tx.type}</div>
                        <div className="text-white/60 text-sm">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-white/40 text-xs">{tx.hash}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold text-lg ${
                        tx.type === 'receive' ? 'text-green-400' : 'text-white'
                      }`}>
                        {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Security</h4>
                <div className="space-y-4">
                  <button className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Change Password</div>
                        <div className="text-white/60 text-sm">Update your wallet password</div>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60" />
                  </button>

                  <button className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Export Private Key</div>
                        <div className="text-white/60 text-sm">Backup your private key securely</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {showPrivateKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Preferences</h4>
                <div className="space-y-4">
                  <button className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Network Settings</div>
                        <div className="text-white/60 text-sm">Configure RPC endpoints</div>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60" />
                  </button>

                  <button className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Manage Tokens</div>
                        <div className="text-white/60 text-sm">Add or remove token visibility</div>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Danger Zone</h4>
                <button
                  onClick={disconnect}
                  className="w-full bg-red-500/20 backdrop-blur-md hover:bg-red-500/30 border border-red-500/30 rounded-2xl p-6 flex items-center justify-between transition-all duration-300 text-red-400"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Disconnect Wallet</div>
                      <div className="text-red-400/60 text-sm">Remove wallet connection</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;