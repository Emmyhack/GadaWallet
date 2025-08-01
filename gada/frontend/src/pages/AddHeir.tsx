import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { 
  User, 
  Coins, 
  Shield, 
  Plus, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Info,
  Copy
} from 'lucide-react';
import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

const AddHeir = () => {
  const navigate = useNavigate();
  const { connected, wallet } = useWallet();
  const program = useAnchorProgram();
  
  const [formData, setFormData] = useState({
    heirAddress: '',
    amount: '',
    assetType: 'coin' as 'coin' | 'token',
    tokenMint: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate heir address
    if (!formData.heirAddress.trim()) {
      newErrors.heirAddress = 'Heir address is required';
    } else {
      try {
        new PublicKey(formData.heirAddress);
      } catch {
        newErrors.heirAddress = 'Invalid Solana address';
      }
    }

    // Validate amount
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      }
    }

    // Validate token mint for token type
    if (formData.assetType === 'token' && !formData.tokenMint.trim()) {
      newErrors.tokenMint = 'Token mint address is required for SPL tokens';
    } else if (formData.assetType === 'token' && formData.tokenMint.trim()) {
      try {
        new PublicKey(formData.tokenMint);
      } catch {
        newErrors.tokenMint = 'Invalid token mint address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!connected || !program || !wallet?.publicKey) {
      setErrors({ general: 'Please connect your wallet first' });
      return;
    }

    setLoading(true);
    try {
      const heirPubkey = new PublicKey(formData.heirAddress);
      const amount = new BN(parseFloat(formData.amount) * (formData.assetType === 'coin' ? 1e9 : 1)); // Convert to lamports for SOL

      if (formData.assetType === 'coin') {
        // Add coin heir
        // await addCoinHeir(program, heirPubkey, amount);
        console.log('Adding coin heir:', { heir: heirPubkey.toString(), amount: amount.toString() });
      } else {
        // Add token heir
        const tokenMint = new PublicKey(formData.tokenMint);
        // await addTokenHeir(program, heirPubkey, tokenMint, amount);
        console.log('Adding token heir:', { 
          heir: heirPubkey.toString(), 
          tokenMint: tokenMint.toString(), 
          amount: amount.toString() 
        });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error adding heir:', error);
      setErrors({ general: 'Failed to add heir. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Please connect your Solana wallet to add heirs to your digital inheritance plan.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary btn-lg">
            <span>Connect Wallet</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Heir Added Successfully!</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Your heir has been added to your digital inheritance plan. Redirecting to dashboard...
          </p>
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-success-400" />
          </div>
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
          <h1 className="text-3xl font-bold gradient-text">Add New Heir</h1>
          <p className="text-dark-300">Designate a beneficiary for your digital assets</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Info Card */}
        <div className="card p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How it works</h3>
              <p className="text-dark-300 mb-3">
                When you add a heir, they will be able to claim the specified assets after a period of your inactivity 
                (default: 1 year). You can update your activity at any time to prevent premature claims.
              </p>
              <div className="text-sm text-dark-400">
                <p>• Heirs can only claim after the inactivity period</p>
                <p>• You can update your activity to reset the timer</p>
                <p>• Multiple heirs can be added for different assets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Asset Type Selection */}
            <div className="form-group">
              <label className="form-label">Asset Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('assetType', 'coin')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.assetType === 'coin'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Coins className={`w-6 h-6 ${formData.assetType === 'coin' ? 'text-primary-400' : 'text-dark-400'}`} />
                    <div className="text-left">
                      <div className={`font-medium ${formData.assetType === 'coin' ? 'text-white' : 'text-dark-300'}`}>
                        SOL (Native)
                      </div>
                      <div className="text-sm text-dark-400">Solana's native token</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('assetType', 'token')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.assetType === 'token'
                      ? 'border-secondary-500 bg-secondary-500/10'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className={`w-6 h-6 ${formData.assetType === 'token' ? 'text-secondary-400' : 'text-dark-400'}`} />
                    <div className="text-left">
                      <div className={`font-medium ${formData.assetType === 'token' ? 'text-white' : 'text-dark-300'}`}>
                        SPL Token
                      </div>
                      <div className="text-sm text-dark-400">Any SPL token</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Heir Address */}
            <div className="form-group">
              <label className="form-label">Heir Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.heirAddress}
                  onChange={(e) => handleInputChange('heirAddress', e.target.value)}
                  className={`input ${errors.heirAddress ? 'input-error' : ''}`}
                  placeholder="Enter Solana wallet address"
                />
                {formData.heirAddress && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.heirAddress)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-dark-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
              {errors.heirAddress && <div className="form-error">{errors.heirAddress}</div>}
              <div className="form-help">
                The Solana wallet address of the person who will inherit these assets
              </div>
            </div>

            {/* Token Mint (for SPL tokens) */}
            {formData.assetType === 'token' && (
              <div className="form-group">
                <label className="form-label">Token Mint Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.tokenMint}
                    onChange={(e) => handleInputChange('tokenMint', e.target.value)}
                    className={`input ${errors.tokenMint ? 'input-error' : ''}`}
                    placeholder="Enter SPL token mint address"
                  />
                  {formData.tokenMint && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.tokenMint)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-dark-400 hover:text-white transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.tokenMint && <div className="form-error">{errors.tokenMint}</div>}
                <div className="form-help">
                  The mint address of the SPL token you want to transfer
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`input ${errors.amount ? 'input-error' : ''}`}
                  placeholder={`Enter amount in ${formData.assetType === 'coin' ? 'SOL' : 'tokens'}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400">
                  {formData.assetType === 'coin' ? 'SOL' : 'Tokens'}
                </div>
              </div>
              {errors.amount && <div className="form-error">{errors.amount}</div>}
              <div className="form-help">
                The amount of {formData.assetType === 'coin' ? 'SOL' : 'tokens'} to be inherited
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-error-500/10 border border-error-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-error-400" />
                  <span className="text-error-400">{errors.general}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn-lg flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding Heir...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Heir</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary btn-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Common Token Addresses */}
        {formData.assetType === 'token' && (
          <div className="card p-6 mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Common Token Addresses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
                { name: 'USDT', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
                { name: 'RAY', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
                { name: 'SRM', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt' }
              ].map((token) => (
                <button
                  key={token.address}
                  type="button"
                  onClick={() => handleInputChange('tokenMint', token.address)}
                  className="p-3 rounded-lg border border-dark-600 hover:border-dark-500 transition-colors text-left"
                >
                  <div className="font-medium text-white">{token.name}</div>
                  <div className="text-sm text-dark-400 font-mono">
                    {formatAddress(token.address)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHeir; 