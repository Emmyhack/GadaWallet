import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { Plus, Download, User, Coins, Loader2, RefreshCw, Send } from 'lucide-react';

interface HeirData {
  type: 'token' | 'coin';
  heir: string;
  amount: string;
  claimed: boolean;
  lastActive: string;
  tokenMint?: string;
}

const Dashboard = () => {
  const { connected, wallet } = useWallet();
  const program = useAnchorProgram();
  const [heirs, setHeirs] = useState<HeirData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch heirs data from the contract
  const fetchHeirs = async () => {
    if (!program || !wallet?.publicKey || !connected) return;
    
    setLoading(true);
    try {
      const owner = wallet.publicKey;
      const heirsData: HeirData[] = [];

      // For now, we'll show a placeholder since we need to know the heirs first
      // In a real implementation, you'd store heir addresses or fetch them from events
      console.log('Fetching heirs for owner:', owner.toString());
      
      // This is a placeholder - in practice you'd need to:
      // 1. Store heir addresses when adding them
      // 2. Or fetch from program events
      // 3. Or maintain a separate account with heir list
      
      setHeirs(heirsData);
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

  return (
    <div className="space-y-12 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4 md:mb-0">Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <Link to="/add-heir" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Heir
          </Link>
          <Link to="/claim-assets" className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Claim Assets
          </Link>
          <Link to="/update-activity" className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Update Activity
          </Link>
          <Link to="/batch-transfer" className="btn-secondary flex items-center gap-2">
            <Send className="w-4 h-4" /> Batch Transfer
          </Link>
        </div>
      </div>

              <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg text-metamask-600 mb-1">Connected Wallet</div>
              <div className="font-mono text-xl text-metamask-700">
                {connected && wallet?.publicKey?.toString()}
                {!connected && <span className="text-metamask-400">Not connected</span>}
              </div>
            </div>
          {connected && (
            <div className="mt-4 md:mt-0">
              <button 
                onClick={fetchHeirs}
                disabled={loading}
                className="btn-secondary flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-metamask-600" /> Your Heirs
        </h2>
        
        {loading ? (
          <div className="metamask-card p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-metamask-600" />
            <p className="text-metamask-600">Loading heirs...</p>
          </div>
        ) : heirs.length === 0 ? (
          <div className="metamask-card p-8 text-center">
            <Coins className="w-12 h-12 mx-auto mb-4 text-metamask-400" />
            <h3 className="text-lg font-semibold mb-2">No heirs found</h3>
            <p className="text-metamask-600 mb-4">You haven't added any heirs yet.</p>
            <Link to="/add-heir" className="btn-primary">
              Add Your First Heir
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {heirs.map((heir, idx) => (
              <div key={idx} className="metamask-card p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {heir.type === 'token' ? (
                    <Coins className="w-5 h-5 text-accent-600" />
                  ) : (
                    <Coins className="w-5 h-5 text-metamask-600" />
                  )}
                  <span className="font-semibold text-lg">{heir.heir.slice(0, 8)}...{heir.heir.slice(-8)}</span>
                  <span className="ml-auto px-2 py-1 rounded glass-effect text-xs">
                    {heir.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-metamask-600">
                  Amount: <span className="font-mono">{heir.amount}</span>
                </div>
                {heir.tokenMint && (
                  <div className="text-metamask-600 text-sm">
                    Token: <span className="font-mono">{heir.tokenMint.slice(0, 8)}...{heir.tokenMint.slice(-8)}</span>
                  </div>
                )}
                <div className="text-sm">
                  Status: {heir.claimed ? (
                    <span className="text-success-600 font-semibold">Claimed</span>
                  ) : (
                    <span className="text-warning-600 font-semibold">Pending</span>
                  )}
                </div>
                <div className="text-xs text-metamask-500">
                  Last Active: {heir.lastActive}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 