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
  AlertTriangle,
  CheckCircle,
  Clock,
  Wallet,
  Activity,
  ArrowRight,
  Copy
} from 'lucide-react';

interface HeirData {
  type: 'token' | 'coin';
  heir: string;
  amount: string;
  claimed: boolean;
  lastActive: string;
  tokenMint?: string;
  status: 'active' | 'pending' | 'claimed' | 'expired';
}

const Dashboard = () => {
  const { connected, wallet, publicKey } = useWallet();
  const program = useAnchorProgram();
  const [heirs, setHeirs] = useState<HeirData[]>([]);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [totalProtected, setTotalProtected] = useState<string>('0');

  // Mock data for demonstration
  const mockHeirs: HeirData[] = [
    {
      type: 'coin',
      heir: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      amount: '2.5',
      claimed: false,
      lastActive: '2024-01-15T10:30:00Z',
      status: 'active'
    },
    {
      type: 'token',
      heir: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      amount: '1000',
      claimed: false,
      lastActive: '2024-01-10T14:20:00Z',
      tokenMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      status: 'pending'
    },
    {
      type: 'coin',
      heir: '3xJ8Hn9YqK2mN7pQ1rT5vX8zA4bC6dE9fG1hI3jK5lM7n',
      amount: '1.0',
      claimed: true,
      lastActive: '2023-12-01T09:15:00Z',
      status: 'claimed'
    }
  ];

  // Fetch heirs data from the contract
  const fetchHeirs = async () => {
    if (!program || !wallet?.publicKey || !connected) return;
    
    setLoading(true);
    try {
      const owner = wallet.publicKey;
      console.log('Fetching heirs for owner:', owner.toString());
      
      // For now, using mock data
      // In a real implementation, you'd fetch from the contract
      setTimeout(() => {
        setHeirs(mockHeirs);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching heirs:', error);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'claimed': return 'primary';
      case 'expired': return 'error';
      default: return 'dark';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'claimed': return Download;
      case 'expired': return AlertTriangle;
      default: return Clock;
    }
  };

  useEffect(() => {
    if (connected && program && wallet?.publicKey) {
      fetchHeirs();
      // Set mock balance
      setWalletBalance('5.234');
      setTotalProtected('3.5');
    }
  }, [connected, program, wallet?.publicKey]);

  if (!connected) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Please connect your Solana wallet to access your dashboard and manage your digital inheritance.
          </p>
          <Link to="/" className="btn-primary btn-lg">
            <span>Connect Wallet</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-dark-300">Manage your digital inheritance and monitor your assets</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <Link to="/add-heir" className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Heir</span>
          </Link>
          <Link to="/claim-assets" className="btn-secondary">
            <Download className="w-4 h-4" />
            <span>Claim Assets</span>
          </Link>
          <Link to="/batch-transfer" className="btn-secondary">
            <Send className="w-4 h-4" />
            <span>Batch Transfer</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="status-dot-success"></div>
          </div>
          <div className="amount-display mb-1">{walletBalance} SOL</div>
          <div className="text-sm text-dark-400">Wallet Balance</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="status-dot-warning"></div>
          </div>
          <div className="amount-display mb-1">{totalProtected} SOL</div>
          <div className="text-sm text-dark-400">Protected Assets</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="status-dot-success"></div>
          </div>
          <div className="amount-display mb-1">{heirs.length}</div>
          <div className="text-sm text-dark-400">Total Heirs</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="status-dot-success"></div>
          </div>
          <div className="amount-display mb-1">Active</div>
          <div className="text-sm text-dark-400">Account Status</div>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="text-lg text-dark-300 mb-2">Connected Wallet</div>
            <div className="flex items-center space-x-3">
              <div className="font-mono text-xl text-white">
                {publicKey?.toString()}
              </div>
              <button
                onClick={() => copyToClipboard(publicKey?.toString() || '')}
                className="p-2 text-dark-400 hover:text-white transition-colors"
                title="Copy address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="status-dot-success"></div>
              <span className="text-sm text-dark-300">Connected</span>
            </div>
            <button 
              onClick={fetchHeirs}
              disabled={loading}
              className="btn-secondary"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Heirs Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <User className="w-6 h-6 text-primary-400" />
            <span>Your Heirs</span>
          </h2>
          <Link to="/add-heir" className="btn-primary btn-sm">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
          </div>
        ) : heirs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Heirs Added</h3>
            <p className="text-dark-300 mb-6">Start by adding your first heir to protect your digital assets.</p>
            <Link to="/add-heir" className="btn-primary">
              <Plus className="w-4 h-4" />
              <span>Add Your First Heir</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Heir Address</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {heirs.map((heir, index) => {
                  const StatusIcon = getStatusIcon(heir.status);
                  const statusColor = getStatusColor(heir.status);
                  return (
                    <tr key={index} className="hover:bg-glass-light transition-colors">
                      <td>
                        <div className="flex items-center space-x-2">
                          <div className="font-mono text-sm text-white">
                            {formatAddress(heir.heir)}
                          </div>
                          <button
                            onClick={() => copyToClipboard(heir.heir)}
                            className="p-1 text-dark-400 hover:text-white transition-colors"
                            title="Copy address"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          {heir.type === 'coin' ? (
                            <Coins className="w-4 h-4 text-warning-400" />
                          ) : (
                            <Shield className="w-4 h-4 text-primary-400" />
                          )}
                          <span className="text-sm capitalize">{heir.type}</span>
                        </div>
                      </td>
                      <td>
                        <div className="amount-display-small">
                          {heir.amount} {heir.type === 'coin' ? 'SOL' : 'Tokens'}
                        </div>
                      </td>
                      <td>
                        <div className={`badge-${statusColor} flex items-center space-x-1`}>
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{heir.status}</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm text-dark-300">
                          {formatDate(heir.lastActive)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          {heir.status === 'active' && (
                            <Link to="/update-activity" className="btn-secondary btn-sm">
                              <RefreshCw className="w-3 h-3" />
                              <span>Update</span>
                            </Link>
                          )}
                          {heir.status === 'pending' && (
                            <Link to="/claim-assets" className="btn-success btn-sm">
                              <Download className="w-3 h-3" />
                              <span>Claim</span>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link to="/add-heir" className="card-hover p-6 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Add New Heir</h3>
          <p className="text-dark-300 mb-4">Designate a new beneficiary for your digital assets</p>
          <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
            <span className="text-sm font-medium">Get Started</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/batch-transfer" className="card-hover p-6 group">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Batch Transfer</h3>
          <p className="text-dark-300 mb-4">Send multiple transactions efficiently</p>
          <div className="flex items-center text-secondary-400 group-hover:text-secondary-300 transition-colors">
            <span className="text-sm font-medium">Transfer Now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/update-activity" className="card-hover p-6 group">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Update Activity</h3>
          <p className="text-dark-300 mb-4">Keep your inheritance plan active</p>
          <div className="flex items-center text-accent-400 group-hover:text-accent-300 transition-colors">
            <span className="text-sm font-medium">Update Now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 