import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { 
  Plus, 
  Download, 
  User, 
  Coins, 
  Loader2, 
  RefreshCw, 
  Send, 
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Wallet,
  Activity,
  Settings,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const { connected, wallet } = useWallet();
  const program = useAnchorProgram();
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockStats = {
    totalHeirs: 3,
    totalAssets: '$25,000',
    pendingClaims: 1,
    lastActivity: '2 days ago'
  };

  const mockHeirs = [
    {
      type: 'coin' as const,
      heir: '0x1234...5678',
      amount: '10 SOL',
      claimed: false,
      lastActive: '2024-01-15',
      status: 'active'
    },
    {
      type: 'token' as const,
      heir: '0x8765...4321',
      amount: '1000 USDC',
      claimed: true,
      lastActive: '2024-01-10',
      status: 'claimed'
    },
    {
      type: 'coin' as const,
      heir: '0xabcd...efgh',
      amount: '5 SOL',
      claimed: false,
      lastActive: '2024-01-12',
      status: 'pending'
    }
  ];

  // Fetch heirs data from the contract
  const fetchHeirs = async () => {
    if (!program || !wallet?.publicKey || !connected) return;
    
    setLoading(true);
    try {
      const owner = wallet.publicKey;

      // For now, we'll show mock data since we need to know the heirs first
      console.log('Fetching heirs for owner:', owner.toString());
      
      // This is a placeholder - in practice you'd need to:
      // 1. Store heir addresses when adding them
      // 2. Or fetch from program events
      // 3. Or maintain a separate account with heir list
    } catch (error) {
      console.error('Error fetching heirs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && program && wallet?.publicKey) {
      fetchHeirs();
    }
  }, [connected, program, wallet?.publicKey]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-500" />;
      case 'claimed':
        return <Download className="w-4 h-4 text-primary-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge-success">Active</span>;
      case 'pending':
        return <span className="badge-warning">Pending</span>;
      case 'claimed':
        return <span className="badge-primary">Claimed</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-neutral-400">
            Manage your digital inheritance and monitor your assets
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link to="/add-heir" className="btn-primary">
            <Plus className="w-4 h-4" />
            Add Heir
          </Link>
          <Link to="/claim-assets" className="btn-secondary">
            <Download className="w-4 h-4" />
            Claim Assets
          </Link>
          <Link to="/update-activity" className="btn-outline">
            <RefreshCw className="w-4 h-4" />
            Update Activity
          </Link>
          <Link to="/batch-transfer" className="btn-outline">
            <Send className="w-4 h-4" />
            Batch Transfer
          </Link>
        </div>
      </div>

      {/* Wallet Status Card */}
      <div className="card-elevated p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Connected Wallet</h3>
                <p className="text-sm text-neutral-400">
                  {connected ? 'Wallet is connected and ready' : 'Please connect your wallet'}
                </p>
              </div>
            </div>
            
            {connected && wallet?.publicKey && (
              <div className="wallet-address inline-block mt-2">
                {wallet.publicKey.toString()}
              </div>
            )}
          </div>
          
          {connected && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="status-dot-online"></div>
                <span className="text-sm text-neutral-400">Connected</span>
              </div>
              <button 
                onClick={fetchHeirs}
                disabled={loading}
                className="btn-outline btn-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-success-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-100 mb-1">{mockStats.totalHeirs}</div>
          <div className="text-sm text-neutral-400">Total Heirs</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <Shield className="w-5 h-5 text-primary-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-100 mb-1">{mockStats.totalAssets}</div>
          <div className="text-sm text-neutral-400">Total Assets</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <AlertCircle className="w-5 h-5 text-warning-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-100 mb-1">{mockStats.pendingClaims}</div>
          <div className="text-sm text-neutral-400">Pending Claims</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-success-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-100 mb-1">{mockStats.lastActivity}</div>
          <div className="text-sm text-neutral-400">Last Activity</div>
        </div>
      </div>

      {/* Heirs Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-100">Your Heirs</h2>
              <p className="text-sm text-neutral-400">Manage your designated beneficiaries</p>
            </div>
          </div>
          <Link to="/add-heir" className="btn-primary btn-sm">
            <Plus className="w-4 h-4" />
            Add New Heir
          </Link>
        </div>

        {mockHeirs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-300 mb-2">No Heirs Added</h3>
            <p className="text-neutral-400 mb-6">Start by adding your first heir to secure your digital legacy</p>
            <Link to="/add-heir" className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Your First Heir
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockHeirs.map((heir, index) => (
              <div key={index} className="transaction-item">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                    {heir.type === 'coin' ? (
                      <Coins className="w-5 h-5 text-white" />
                    ) : (
                      <Shield className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-neutral-100">{heir.heir}</h4>
                      {getStatusIcon(heir.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-neutral-400">{heir.amount}</span>
                      <span className="text-xs text-neutral-500">•</span>
                      <span className="text-sm text-neutral-400">Last active: {heir.lastActive}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(heir.status)}
                    <button className="p-2 rounded-lg hover:bg-neutral-800/50 transition-colors">
                      <Settings className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/add-heir" className="card p-4 hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-100 group-hover:text-primary-400 transition-colors">Add Heir</h4>
                <p className="text-sm text-neutral-400">Designate a new beneficiary</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-primary-400 transition-colors" />
            </div>
          </Link>

          <Link to="/batch-transfer" className="card p-4 hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-100 group-hover:text-secondary-400 transition-colors">Batch Transfer</h4>
                <p className="text-sm text-neutral-400">Send assets to multiple recipients</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-secondary-400 transition-colors" />
            </div>
          </Link>

          <Link to="/update-activity" className="card p-4 hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-100 group-hover:text-accent-400 transition-colors">Update Activity</h4>
                <p className="text-sm text-neutral-400">Reset your activity timer</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-accent-400 transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 