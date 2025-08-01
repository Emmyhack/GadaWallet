import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { 
  Download, 
  Coins, 
  Shield, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Clock,
  Copy,
  Info
} from 'lucide-react';

interface ClaimableAsset {
  id: string;
  type: 'coin' | 'token';
  owner: string;
  amount: string;
  tokenMint?: string;
  tokenName?: string;
  lastActive: string;
  status: 'claimable' | 'pending' | 'claimed';
  ownerName?: string;
}

const ClaimAssets = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const program = useAnchorProgram();
  
  const [claimableAssets, setClaimableAssets] = useState<ClaimableAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockClaimableAssets: ClaimableAsset[] = [
    {
      id: '1',
      type: 'coin',
      owner: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      amount: '2.5',
      lastActive: '2023-01-15T10:30:00Z',
      status: 'claimable',
      ownerName: 'John Doe'
    },
    {
      id: '2',
      type: 'token',
      owner: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      amount: '1000',
      tokenMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      tokenName: 'USDC',
      lastActive: '2023-01-10T14:20:00Z',
      status: 'pending',
      ownerName: 'Jane Smith'
    },
    {
      id: '3',
      type: 'coin',
      owner: '3xJ8Hn9YqK2mN7pQ1rT5vX8zA4bC6dE9fG1hI3jK5lM7n',
      amount: '1.0',
      lastActive: '2023-12-01T09:15:00Z',
      status: 'claimed',
      ownerName: 'Bob Johnson'
    }
  ];

  const fetchClaimableAssets = async () => {
    if (!connected || !publicKey) return;
    
    setLoading(true);
    try {
      // In a real implementation, you'd fetch from the contract
      // For now, using mock data
      setTimeout(() => {
        setClaimableAssets(mockClaimableAssets);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching claimable assets:', error);
      setError('Failed to fetch claimable assets');
      setLoading(false);
    }
  };

  const handleClaim = async (assetId: string) => {
    if (!connected || !program || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setClaiming(assetId);
    setError(null);
    
    try {
      // In a real implementation, you'd call the contract
      // await claimHeirCoinAssets(program, coinHeirPDA, ownerAccount);
      console.log('Claiming asset:', assetId);
      
      // Simulate claim process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the asset status
      setClaimableAssets(prev => 
        prev.map(asset => 
          asset.id === assetId 
            ? { ...asset, status: 'claimed' as const }
            : asset
        )
      );
      
      setSuccess(`Successfully claimed ${assetId}`);
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error) {
      console.error('Error claiming asset:', error);
      setError('Failed to claim asset. Please try again.');
    } finally {
      setClaiming(null);
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
      case 'claimable': return 'success';
      case 'pending': return 'warning';
      case 'claimed': return 'primary';
      default: return 'dark';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'claimable': return Download;
      case 'pending': return Clock;
      case 'claimed': return CheckCircle;
      default: return Clock;
    }
  };

  const getTimeUntilClaimable = (lastActive: string) => {
    const lastActiveDate = new Date(lastActive);
    const now = new Date();
    const timeDiff = now.getTime() - lastActiveDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const requiredDays = 365; // 1 year
    const remainingDays = requiredDays - daysDiff;
    
    if (remainingDays <= 0) return 'Ready to claim';
    return `${remainingDays} days remaining`;
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchClaimableAssets();
    }
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Please connect your Solana wallet to view and claim your inherited assets.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary btn-lg">
            <span>Connect Wallet</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-glass-light transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Claim Assets</h1>
          <p className="text-dark-300">View and claim your inherited digital assets</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="card p-6 mb-8">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">How claiming works</h3>
            <p className="text-dark-300 mb-3">
              Assets become claimable after the original owner has been inactive for 1 year. 
              You can only claim assets that have been designated to your wallet address.
            </p>
            <div className="text-sm text-dark-400">
              <p>• Assets are locked for 1 year after owner's last activity</p>
              <p>• Only the designated heir can claim the assets</p>
              <p>• Claims are processed on the Solana blockchain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="card p-4 mb-6 bg-success-500/10 border border-success-500/30">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success-400" />
            <span className="text-success-400">{success}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="card p-4 mb-6 bg-error-500/10 border border-error-500/30">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-error-400" />
            <span className="text-error-400">{error}</span>
          </div>
        </div>
      )}

      {/* Assets List */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Download className="w-6 h-6 text-primary-400" />
            <span>Claimable Assets</span>
          </h2>
          <button
            onClick={fetchClaimableAssets}
            disabled={loading}
            className="btn-secondary"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
          </div>
        ) : claimableAssets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Claimable Assets</h3>
            <p className="text-dark-300 mb-6">
              You don't have any assets that are ready to claim at the moment.
            </p>
            <div className="text-sm text-dark-400">
              <p>• Assets become claimable after 1 year of owner inactivity</p>
              <p>• Check back later or contact the asset owner</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {claimableAssets.map((asset) => {
              const StatusIcon = getStatusIcon(asset.status);
              const statusColor = getStatusColor(asset.status);
              const isClaiming = claiming === asset.id;
              
              return (
                <div key={asset.id} className="card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${statusColor}-500 to-${statusColor}-600 rounded-xl flex items-center justify-center`}>
                          {asset.type === 'coin' ? (
                            <Coins className="w-6 h-6 text-white" />
                          ) : (
                            <Shield className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {asset.amount} {asset.type === 'coin' ? 'SOL' : asset.tokenName || 'Tokens'}
                          </h3>
                          <p className="text-dark-300">
                            From {asset.ownerName || formatAddress(asset.owner)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-dark-400 mb-1">Owner Address</div>
                          <div className="flex items-center space-x-2">
                            <div className="font-mono text-sm text-white">
                              {formatAddress(asset.owner)}
                            </div>
                            <button
                              onClick={() => copyToClipboard(asset.owner)}
                              className="p-1 text-dark-400 hover:text-white transition-colors"
                              title="Copy address"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-dark-400 mb-1">Last Active</div>
                          <div className="text-sm text-white">
                            {formatDate(asset.lastActive)}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-dark-400 mb-1">Status</div>
                          <div className={`badge-${statusColor} flex items-center space-x-1`}>
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{asset.status}</span>
                          </div>
                        </div>
                      </div>

                      {asset.status === 'pending' && (
                        <div className="p-3 bg-warning-500/10 border border-warning-500/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-warning-400" />
                            <span className="text-warning-400 text-sm">
                              {getTimeUntilClaimable(asset.lastActive)}
                            </span>
                          </div>
                        </div>
                      )}

                      {asset.status === 'claimed' && (
                        <div className="p-3 bg-success-500/10 border border-success-500/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-success-400" />
                            <span className="text-success-400 text-sm">
                              Successfully claimed on {formatDate(asset.lastActive)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-6">
                      {asset.status === 'claimable' && (
                        <button
                          onClick={() => handleClaim(asset.id)}
                          disabled={isClaiming}
                          className="btn-success"
                        >
                          {isClaiming ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Claiming...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Claim</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {claimableAssets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold gradient-text-primary mb-2">
              {claimableAssets.filter(a => a.status === 'claimable').length}
            </div>
            <div className="text-sm text-dark-400">Ready to Claim</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold gradient-text-warning mb-2">
              {claimableAssets.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-sm text-dark-400">Pending</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold gradient-text-primary mb-2">
              {claimableAssets.filter(a => a.status === 'claimed').length}
            </div>
            <div className="text-sm text-dark-400">Already Claimed</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimAssets; 