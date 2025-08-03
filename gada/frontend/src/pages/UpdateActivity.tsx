import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram, updateActivity, updateCoinActivity, getCoinHeirPDA, getTokenHeirPDA } from '../lib/anchor';
import { RefreshCw, Loader2, CheckCircle } from 'lucide-react';
import { web3 } from '@coral-xyz/anchor';

const UpdateActivity = () => {
  const { connected } = useWallet();
  const program = useAnchorProgram();
  const [type, setType] = useState<'token' | 'coin'>('token');
  const [heir, setHeir] = useState('');
  const [tokenMint, setTokenMint] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !connected) return;
    
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const heirPubkey = new web3.PublicKey(heir);

      if (type === 'coin') {
        const [coinHeirPDA] = getCoinHeirPDA(program.provider.publicKey!, heirPubkey);
        await updateCoinActivity(program, coinHeirPDA);
      } else {
        const tokenMintPubkey = new web3.PublicKey(tokenMint);
        const [tokenHeirPDA] = getTokenHeirPDA(program.provider.publicKey!, heirPubkey, tokenMintPubkey);
        await updateActivity(program, tokenHeirPDA);
      }

      setSuccess(true);
      setHeir('');
      setTokenMint('');
    } catch (err) {
      console.error('Error updating activity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto card p-8 mt-8">
      <h1 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-2">
        <RefreshCw className="w-7 h-7 text-metamask-600" /> Update Activity
      </h1>
      {!connected && (
        <div className="mb-4 text-metamask-600 font-semibold">Please connect your wallet to update activity.</div>
      )}
      
      <div className="mb-6 p-4 bg-metamask-50 rounded-lg">
        <h3 className="font-semibold text-metamask-800 mb-2">Why Update Activity?</h3>
<p className="text-metamask-700 text-sm">
          Updating your activity proves you're still active and prevents your heirs from claiming 
          your assets prematurely. This should be done regularly to maintain control over your inheritance.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Heir Address</label>
          <input
            type="text"
            className="input-field"
            value={heir}
            onChange={e => setHeir(e.target.value)}
            placeholder="Enter heir's public key"
            required
            disabled={!connected}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            className="input-field"
            value={type}
            onChange={e => setType(e.target.value as 'token' | 'coin')}
            disabled={!connected}
          >
            <option value="token">Token</option>
            <option value="coin">Coin (SOL)</option>
          </select>
        </div>
        
        {type === 'token' && (
          <div>
            <label className="block mb-1 font-medium">Token Mint Address</label>
            <input
              type="text"
              className="input-field"
              value={tokenMint}
              onChange={e => setTokenMint(e.target.value)}
              placeholder="Enter token mint address"
              required={type === 'token'}
              disabled={!connected}
            />
          </div>
        )}
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={!connected || loading || !program}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          Update Activity
        </button>
        
        {success && (
          <div className="text-green-600 font-semibold text-center mt-2 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Activity updated successfully!
          </div>
        )}
        {error && (
          <div className="text-red-600 font-semibold text-center mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default UpdateActivity; 