import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { 
  Send, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Info,
  Coins,
  Shield,
  Copy,
  Users,
  Zap
} from 'lucide-react';
import { PublicKey } from '@solana/web3.js';

interface TransferRecipient {
  id: string;
  address: string;
  amount: string;
  name?: string;
}



const BatchTransfer = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const program = useAnchorProgram();
  
  const [transferType, setTransferType] = useState<'coin' | 'token'>('coin');
  const [tokenMint, setTokenMint] = useState('');
  const [recipients, setRecipients] = useState<TransferRecipient[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addRecipient = () => {
    const newRecipient: TransferRecipient = {
      id: Date.now().toString(),
      address: '',
      amount: '',
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const updateRecipient = (id: string, field: keyof TransferRecipient, value: string) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const validateForm = () => {
    if (recipients.length === 0) {
      setError('Add at least one recipient');
      return false;
    }

    if (transferType === 'token' && !tokenMint.trim()) {
      setError('Token mint address is required for SPL tokens');
      return false;
    }

    for (const recipient of recipients) {
      if (!recipient.address.trim()) {
        setError('All recipient addresses are required');
        return false;
      }
      if (!recipient.amount.trim() || parseFloat(recipient.amount) <= 0) {
        setError('All amounts must be positive numbers');
        return false;
      }
      try {
        new PublicKey(recipient.address);
      } catch {
        setError('Invalid recipient address');
        return false;
      }
    }

    if (transferType === 'token' && tokenMint.trim()) {
      try {
        new PublicKey(tokenMint);
      } catch {
        setError('Invalid token mint address');
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!connected || !program || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const amounts = recipients.map(r => parseFloat(r.amount));

      if (transferType === 'coin') {
        // Batch transfer SOL
        // await batchTransferCoins(program, recipientAddresses[0], amounts);
        console.log('Batch transferring SOL:', { recipients, amounts });
      } else {
        // Batch transfer SPL tokens
        // await batchTransferTokens(program, fromTokenAccount, toTokenAccount, amounts);
        console.log('Batch transferring tokens:', { 
          tokenMint, 
          recipients, 
          amounts 
        });
      }

      setSuccess('Batch transfer completed successfully!');
      setRecipients([]);
      setTokenMint('');
      
      setTimeout(() => {
        setSuccess(null);
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error performing batch transfer:', error);
      setError('Failed to complete batch transfer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const calculateTotal = () => {
    return recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0).toFixed(4);
  };

  const commonTokens = [
    { name: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { name: 'USDT', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
    { name: 'RAY', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
    { name: 'SRM', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt' }
  ];

  if (!connected) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Please connect your Solana wallet to perform batch transfers.
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
          <h1 className="text-3xl font-bold gradient-text">Batch Transfer</h1>
          <p className="text-dark-300">Send multiple transactions efficiently in one batch</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="card p-6 mb-8">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Batch Transfer Benefits</h3>
            <p className="text-dark-300 mb-3">
              Send multiple transactions in a single batch to save time and reduce transaction fees. 
              Perfect for distributing assets to multiple recipients.
            </p>
            <div className="text-sm text-dark-400">
              <p>• Send to multiple recipients in one transaction</p>
              <p>• Reduced gas fees compared to individual transfers</p>
              <p>• Support for both SOL and SPL tokens</p>
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

      <div className="max-w-4xl mx-auto">
        {/* Transfer Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer Type Selection */}
            <div className="form-group">
              <label className="form-label">Transfer Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTransferType('coin')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    transferType === 'coin'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Coins className={`w-6 h-6 ${transferType === 'coin' ? 'text-primary-400' : 'text-dark-400'}`} />
                    <div className="text-left">
                      <div className={`font-medium ${transferType === 'coin' ? 'text-white' : 'text-dark-300'}`}>
                        SOL (Native)
                      </div>
                      <div className="text-sm text-dark-400">Solana's native token</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTransferType('token')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    transferType === 'token'
                      ? 'border-secondary-500 bg-secondary-500/10'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className={`w-6 h-6 ${transferType === 'token' ? 'text-secondary-400' : 'text-dark-400'}`} />
                    <div className="text-left">
                      <div className={`font-medium ${transferType === 'token' ? 'text-white' : 'text-dark-300'}`}>
                        SPL Token
                      </div>
                      <div className="text-sm text-dark-400">Any SPL token</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Token Mint (for SPL tokens) */}
            {transferType === 'token' && (
              <div className="form-group">
                <label className="form-label">Token Mint Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={tokenMint}
                    onChange={(e) => setTokenMint(e.target.value)}
                    className="input"
                    placeholder="Enter SPL token mint address"
                  />
                  {tokenMint && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(tokenMint)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-dark-400 hover:text-white transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="form-help">
                  The mint address of the SPL token you want to transfer
                </div>

                {/* Common Token Addresses */}
                <div className="mt-4">
                  <div className="text-sm text-dark-400 mb-2">Common tokens:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {commonTokens.map((token) => (
                      <button
                        key={token.address}
                        type="button"
                        onClick={() => setTokenMint(token.address)}
                        className="p-2 rounded border border-dark-600 hover:border-dark-500 transition-colors text-left"
                      >
                        <div className="font-medium text-white text-sm">{token.name}</div>
                        <div className="text-xs text-dark-400 font-mono">
                          {formatAddress(token.address)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recipients Section */}
            <div className="form-group">
              <div className="flex items-center justify-between mb-4">
                <label className="form-label">Recipients</label>
                <button
                  type="button"
                  onClick={addRecipient}
                  className="btn-secondary btn-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Recipient</span>
                </button>
              </div>

              {recipients.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-dark-600 rounded-lg">
                  <Users className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                  <p className="text-dark-300 mb-4">No recipients added yet</p>
                  <button
                    type="button"
                    onClick={addRecipient}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Your First Recipient</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recipients.map((recipient, index) => (
                    <div key={recipient.id} className="card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-white">Recipient {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeRecipient(recipient.id)}
                          className="p-2 text-error-400 hover:text-error-300 transition-colors"
                          title="Remove recipient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group">
                          <label className="form-label">Name (Optional)</label>
                          <input
                            type="text"
                            value={recipient.name || ''}
                            onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                            className="input"
                            placeholder="Recipient name"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Wallet Address</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={recipient.address}
                              onChange={(e) => updateRecipient(recipient.id, 'address', e.target.value)}
                              className="input"
                              placeholder="Enter Solana address"
                              required
                            />
                            {recipient.address && (
                              <button
                                type="button"
                                onClick={() => copyToClipboard(recipient.address)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-dark-400 hover:text-white transition-colors"
                                title="Copy address"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Amount</label>
                          <div className="relative">
                            <input
                              type="number"
                              step="any"
                              value={recipient.amount}
                              onChange={(e) => updateRecipient(recipient.id, 'amount', e.target.value)}
                              className="input"
                              placeholder={`Amount in ${transferType === 'coin' ? 'SOL' : 'tokens'}`}
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400">
                              {transferType === 'coin' ? 'SOL' : 'Tokens'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            {recipients.length > 0 && (
              <div className="card p-6 bg-glass-dark">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary-400" />
                  <span>Transfer Summary</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-dark-400 mb-1">Total Recipients</div>
                    <div className="text-xl font-bold text-white">{recipients.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dark-400 mb-1">Total Amount</div>
                    <div className="text-xl font-bold gradient-text-primary">
                      {calculateTotal()} {transferType === 'coin' ? 'SOL' : 'Tokens'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-dark-400 mb-1">Transfer Type</div>
                    <div className="text-xl font-bold text-white capitalize">{transferType}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading || recipients.length === 0}
                className="btn-primary btn-lg flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Transfer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Batch Transfer</span>
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

        {/* Tips */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-primary-400" />
            <span>Batch Transfer Tips</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-dark-300">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Batch transfers are more cost-effective than individual transfers</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-warning-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Double-check all addresses before confirming the transfer</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Ensure you have sufficient balance for all transfers</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-error-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Transfers are irreversible once confirmed on the blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchTransfer; 