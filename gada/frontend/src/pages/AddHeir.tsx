import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram, addCoinHeir, addTokenHeir } from '../lib/anchor';
import { Coins, UserPlus, Loader2 } from 'lucide-react';
import { web3 } from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';

const AddHeir = () => {
  const { connected } = useWallet();
  const program = useAnchorProgram();
  const [type, setType] = useState<'token' | 'coin'>('token');
  const [heir, setHeir] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenMint, setTokenMint] = useState('');
  const [inactivityDays, setInactivityDays] = useState('365');
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
      const amountBN = new BN(parseFloat(amount) * (type === 'coin' ? 1e9 : 1)); // Convert to lamports for SOL
      const inactivitySeconds = Math.max(1, Math.floor(parseFloat(inactivityDays || '0') * 24 * 60 * 60));

      if (type === 'coin') {
        await addCoinHeir(program, heirPubkey, amountBN, inactivitySeconds);
      } else {
        const tokenMintPubkey = new web3.PublicKey(tokenMint);
        await addTokenHeir(program, heirPubkey, tokenMintPubkey, amountBN, inactivitySeconds);
      }

      setSuccess(true);
      setHeir('');
      setAmount('');
      setTokenMint('');
      setInactivityDays('365');
    } catch (err) {
      console.error('Error adding heir:', err);
      
      // Provide more user-friendly error messages
      let errorMessage = 'Failed to add heir';
      if (err instanceof Error) {
        if (err.message.includes('insufficient funds')) {
          errorMessage = 'Insufficient funds in your wallet';
        } else if (err.message.includes('Transaction simulation failed')) {
          errorMessage = 'Transaction failed. Please check your inputs and try again.';
        } else if (err.message.includes('User rejected')) {
          errorMessage = 'Transaction was cancelled by user';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto card p-8 mt-8">
      <h1 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-2">
        <UserPlus className="w-7 h-7 text-purple-600" /> Add Heir
      </h1>
      {!connected && (
        <div className="mb-4 text-purple-600 font-semibold">Please connect your wallet to add an heir.</div>
      )}
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
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            className="input-field"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={type === 'coin' ? 'Amount in SOL' : 'Amount in tokens'}
            required
            min={0}
            step={type === 'token' ? 1 : 0.0001}
            disabled={!connected}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Inactivity (days)</label>
          <input
            type="number"
            className="input-field"
            value={inactivityDays}
            onChange={e => setInactivityDays(e.target.value)}
            placeholder="e.g. 365"
            required
            min={1}
            step={1}
            disabled={!connected}
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={!connected || loading || !program}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Coins className="w-5 h-5" />}
          Add Heir
        </button>
        {success && (
          <div className="text-green-600 font-semibold text-center mt-2">Heir added successfully!</div>
        )}
        {error && (
          <div className="text-red-600 font-semibold text-center mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default AddHeir; 