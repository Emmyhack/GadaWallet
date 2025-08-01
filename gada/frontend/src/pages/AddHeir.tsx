import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram, addCoinHeir, addTokenHeir } from '../lib/anchor';
import { Coins, UserPlus, Loader2, Shield, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { web3 } from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';
import { Link } from 'react-router-dom';

const AddHeir = () => {
  const { connected } = useWallet();
  const program = useAnchorProgram();
  const [type, setType] = useState<'token' | 'coin'>('token');
  const [heir, setHeir] = useState('');
  const [amount, setAmount] = useState('');
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
      const amountBN = new BN(parseFloat(amount) * (type === 'coin' ? 1e9 : 1)); // Convert to lamports for SOL

      if (type === 'coin') {
        await addCoinHeir(program, heirPubkey, amountBN);
      } else {
        const tokenMintPubkey = new web3.PublicKey(tokenMint);
        await addTokenHeir(program, heirPubkey, tokenMintPubkey, amountBN);
      }

      setSuccess(true);
      setHeir('');
      setAmount('');
      setTokenMint('');
    } catch (err) {
      console.error('Error adding heir:', err);
      setError(err instanceof Error ? err.message : 'Failed to add heir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center space-x-2 text-neutral-400 hover:text-neutral-200 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              <span className="gradient-text">Add New Heir</span>
            </h1>
            <p className="text-neutral-400">Designate a beneficiary for your digital assets</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="card p-6 mb-6 border border-success-500/20 bg-success-500/10">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-success-500" />
              <div>
                <h3 className="font-semibold text-success-400">Heir Added Successfully!</h3>
                <p className="text-sm text-neutral-400">Your beneficiary has been registered and can claim assets after the inactivity period.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="card p-6 mb-6 border border-error-500/20 bg-error-500/10">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-error-500" />
              <div>
                <h3 className="font-semibold text-error-400">Error Adding Heir</h3>
                <p className="text-sm text-neutral-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="card-elevated p-8">
          {!connected && (
            <div className="mb-6 p-4 bg-warning-500/10 border border-warning-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning-500" />
                <span className="text-warning-400 font-medium">Please connect your wallet to add an heir.</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Asset Type Selection */}
            <div className="form-group">
              <label className="form-label">Asset Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType('coin')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    type === 'coin'
                      ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                      : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Coins className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">SOL</div>
                      <div className="text-xs">Native Solana</div>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setType('token')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    type === 'token'
                      ? 'border-secondary-500 bg-secondary-500/10 text-secondary-400'
                      : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">SPL Token</div>
                      <div className="text-xs">Custom tokens</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Heir Address */}
            <div className="form-group">
              <label className="form-label">Heir's Wallet Address</label>
              <input
                type="text"
                className="input"
                value={heir}
                onChange={e => setHeir(e.target.value)}
                placeholder="Enter the public key of your beneficiary"
                required
                disabled={!connected || loading}
              />
              <p className="form-help">This is the wallet address that will receive the assets after the inactivity period.</p>
            </div>

            {/* Token Mint Address (only for tokens) */}
            {type === 'token' && (
              <div className="form-group">
                <label className="form-label">Token Mint Address</label>
                <input
                  type="text"
                  className="input"
                  value={tokenMint}
                  onChange={e => setTokenMint(e.target.value)}
                  placeholder="Enter the token mint address"
                  required={type === 'token'}
                  disabled={!connected || loading}
                />
                <p className="form-help">The mint address of the SPL token you want to transfer.</p>
              </div>
            )}

            {/* Amount */}
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  className="input pr-16"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder={`Enter amount in ${type === 'coin' ? 'SOL' : 'tokens'}`}
                  required
                  disabled={!connected || loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                  {type === 'coin' ? 'SOL' : 'tokens'}
                </div>
              </div>
              <p className="form-help">
                {type === 'coin' 
                  ? 'Amount of SOL to be transferred to the heir after inactivity period.'
                  : 'Amount of tokens to be transferred to the heir after inactivity period.'
                }
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!connected || loading}
              className="btn-primary w-full py-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Heir...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Add Heir
                </>
              )}
            </button>
          </form>
        </div>

        {/* Information Card */}
        <div className="card p-6 mt-6">
          <h3 className="font-semibold text-neutral-100 mb-3 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary-500" />
            <span>How It Works</span>
          </h3>
          <div className="space-y-2 text-sm text-neutral-400">
            <p>• Your assets remain in your wallet until the inactivity period is reached</p>
            <p>• Heirs can only claim assets after you've been inactive for the specified time</p>
            <p>• You can update your activity at any time to reset the timer</p>
            <p>• All transactions are secured by Solana smart contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHeir; 