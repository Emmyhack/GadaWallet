import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram, batchTransferTokens, batchTransferCoins } from '../lib/anchor';
import { Send, Loader2, Plus, Trash2 } from 'lucide-react';
import { web3 } from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';

interface TransferItem {
  id: string;
  amount: string;
}

const BatchTransfer = () => {
  const { connected } = useWallet();
  const program = useAnchorProgram();
  const [type, setType] = useState<'token' | 'coin'>('token');
  const [toAccount, setToAccount] = useState('');
  const [fromTokenAccount, setFromTokenAccount] = useState('');
  const [toTokenAccount, setToTokenAccount] = useState('');
  const [transfers, setTransfers] = useState<TransferItem[]>([
    { id: '1', amount: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const addTransfer = () => {
    if (transfers.length < 10) {
      setTransfers([...transfers, { id: Date.now().toString(), amount: '' }]);
    }
  };

  const removeTransfer = (id: string) => {
    if (transfers.length > 1) {
      setTransfers(transfers.filter(t => t.id !== id));
    }
  };

  const updateTransfer = (id: string, amount: string) => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, amount } : t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !connected) return;
    
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const amounts = transfers
        .map(t => parseFloat(t.amount))
        .filter(amount => amount > 0)
        .map(amount => new BN(amount * (type === 'coin' ? 1e9 : 1)));

      if (amounts.length === 0) {
        throw new Error('Please enter at least one valid amount');
      }

      if (type === 'coin') {
        const toAccountPubkey = new web3.PublicKey(toAccount);
        await batchTransferCoins(program, toAccountPubkey, amounts);
      } else {
        const fromTokenAccountPubkey = new web3.PublicKey(fromTokenAccount);
        const toTokenAccountPubkey = new web3.PublicKey(toTokenAccount);
        await batchTransferTokens(program, fromTokenAccountPubkey, toTokenAccountPubkey, amounts);
      }

      setSuccess(true);
      setToAccount('');
      setFromTokenAccount('');
      setToTokenAccount('');
      setTransfers([{ id: '1', amount: '' }]);
    } catch (err) {
      console.error('Error performing batch transfer:', err);
      setError(err instanceof Error ? err.message : 'Failed to perform batch transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto card p-8 mt-8">
      <h1 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-2">
        <Send className="w-7 h-7 text-metamask-600" /> Batch Transfer
      </h1>
      {!connected && (
        <div className="mb-4 text-metamask-600 font-semibold">Please connect your wallet to perform batch transfers.</div>
      )}
      
      <div className="mb-6 p-4 bg-metamask-50 rounded-lg">
        <h3 className="font-semibold text-metamask-800 mb-2">Batch Transfer Benefits</h3>
<p className="text-metamask-700 text-sm">
          Transfer multiple amounts in a single transaction. This saves on transaction fees 
          and allows for more efficient asset distribution. Maximum 10 transfers per batch.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
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

        {type === 'coin' ? (
          <div>
            <label className="block mb-1 font-medium">To Account</label>
            <input
              type="text"
              className="input-field"
              value={toAccount}
              onChange={e => setToAccount(e.target.value)}
              placeholder="Enter recipient's public key"
              required
              disabled={!connected}
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">From Token Account</label>
              <input
                type="text"
                className="input-field"
                value={fromTokenAccount}
                onChange={e => setFromTokenAccount(e.target.value)}
                placeholder="Enter your token account"
                required
                disabled={!connected}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">To Token Account</label>
              <input
                type="text"
                className="input-field"
                value={toTokenAccount}
                onChange={e => setToTokenAccount(e.target.value)}
                placeholder="Enter recipient's token account"
                required
                disabled={!connected}
              />
            </div>
          </>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block font-medium">Transfer Amounts</label>
            <button
              type="button"
              onClick={addTransfer}
              disabled={transfers.length >= 10 || !connected}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Transfer
            </button>
          </div>
          
          <div className="space-y-3">
            {transfers.map((transfer, index) => (
              <div key={transfer.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    className="input-field"
                    value={transfer.amount}
                    onChange={e => updateTransfer(transfer.id, e.target.value)}
                    placeholder={`Amount ${index + 1} ${type === 'coin' ? 'in SOL' : 'in tokens'}`}
                    min={0}
                    step={type === 'coin' ? 0.0001 : 1}
                    disabled={!connected}
                  />
                </div>
                {transfers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTransfer(transfer.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={!connected}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={!connected || loading || !program}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Execute Batch Transfer
        </button>

        {success && (
          <div className="text-green-600 font-semibold text-center mt-2">
            Batch transfer completed successfully!
          </div>
        )}
        {error && (
          <div className="text-red-600 font-semibold text-center mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default BatchTransfer; 