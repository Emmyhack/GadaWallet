import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram, claimHeirCoinAssets, claimHeirTokenAssets, getCoinHeirPDA, getTokenHeirPDA } from '../lib/anchor';
import { Coins, Download, Loader2 } from 'lucide-react';
import { web3 } from '@coral-xyz/anchor';

const ClaimAssets = () => {
  const { connected } = useWallet();
  const program = useAnchorProgram();
  const [type, setType] = useState<'token' | 'coin'>('token');
  const [owner, setOwner] = useState('');
  const [tokenMint, setTokenMint] = useState('');
  const [ownerTokenAccount, setOwnerTokenAccount] = useState('');
  const [heirTokenAccount, setHeirTokenAccount] = useState('');
  const [authority, setAuthority] = useState('');
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
      const ownerPubkey = new web3.PublicKey(owner);

      if (type === 'coin') {
        const [coinHeirPDA] = getCoinHeirPDA(ownerPubkey, program.provider.publicKey!);
        await claimHeirCoinAssets(program, coinHeirPDA, ownerPubkey);
      } else {
        const tokenMintPubkey = new web3.PublicKey(tokenMint);
        const ownerTokenAccountPubkey = new web3.PublicKey(ownerTokenAccount);
        const heirTokenAccountPubkey = new web3.PublicKey(heirTokenAccount);
        const authorityPubkey = new web3.PublicKey(authority);
        
        const [tokenHeirPDA] = getTokenHeirPDA(ownerPubkey, program.provider.publicKey!, tokenMintPubkey);
        await claimHeirTokenAssets(
          program, 
          tokenHeirPDA, 
          ownerPubkey, 
          ownerTokenAccountPubkey, 
          heirTokenAccountPubkey, 
          authorityPubkey
        );
      }

      setSuccess(true);
      setOwner('');
      setTokenMint('');
      setOwnerTokenAccount('');
      setHeirTokenAccount('');
      setAuthority('');
    } catch (err) {
      console.error('Error claiming assets:', err);
      setError(err instanceof Error ? err.message : 'Failed to claim assets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto card p-8 mt-8">
      <h1 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-2">
        <Download className="w-7 h-7 text-metamask-600" /> Claim Assets
      </h1>
      {!connected && (
        <div className="mb-4 text-metamask-600 font-semibold">Please connect your wallet to claim assets.</div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Owner Address</label>
          <input
            type="text"
            className="input-field"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            placeholder="Enter owner's public key"
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
          <>
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
            <div>
              <label className="block mb-1 font-medium">Owner Token Account</label>
              <input
                type="text"
                className="input-field"
                value={ownerTokenAccount}
                onChange={e => setOwnerTokenAccount(e.target.value)}
                placeholder="Enter owner's token account"
                required={type === 'token'}
                disabled={!connected}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Heir Token Account</label>
              <input
                type="text"
                className="input-field"
                value={heirTokenAccount}
                onChange={e => setHeirTokenAccount(e.target.value)}
                placeholder="Enter heir's token account"
                required={type === 'token'}
                disabled={!connected}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Authority</label>
              <input
                type="text"
                className="input-field"
                value={authority}
                onChange={e => setAuthority(e.target.value)}
                placeholder="Enter authority public key"
                required={type === 'token'}
                disabled={!connected}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="btn-accent w-full flex items-center justify-center gap-2"
          disabled={loading || !connected || !program}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Coins className="w-5 h-5" />}
          Claim Assets
        </button>
        {success && (
          <div className="text-green-600 font-semibold text-center mt-2">Assets claimed successfully!</div>
        )}
        {error && (
          <div className="text-red-600 font-semibold text-center mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default ClaimAssets; 