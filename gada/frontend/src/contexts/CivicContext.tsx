import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from './WalletContext';
import { useConnection } from '@solana/wallet-adapter-react';

// Civic Gateway configuration
// Use environment configuration to ensure the gatekeeper network matches the selected cluster
// Defaults are set to known Civic Captcha Pass networks for devnet and mainnet-beta
const CLUSTER = (import.meta as any).env?.VITE_SOLANA_CLUSTER || 'devnet';
const GKN_DEVNET = (import.meta as any).env?.VITE_CIVIC_GKN_DEVNET || 'tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf';
const GKN_MAINNET = (import.meta as any).env?.VITE_CIVIC_GKN_MAINNET || 'tibePmPaoTgrs929rWPUrH4QyYqJE7xVJ9mfjTthM7g';
const GATEKEEPER_NETWORK = new PublicKey(CLUSTER === 'mainnet-beta' ? GKN_MAINNET : GKN_DEVNET);

interface CivicContextType {
  isVerified: boolean;
  isLoading: boolean;
  requestGatewayToken: (() => void) | undefined;
  gatewayToken: any;
  gatewayStatus: GatewayStatus;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const useCivic = () => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
};

// Inner provider that uses the Gateway hook
const CivicInnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { gatewayToken, gatewayStatus, requestGatewayToken } = useGateway();
  
  const isVerified = gatewayStatus === GatewayStatus.ACTIVE && !!gatewayToken;
  const isLoading = gatewayStatus === GatewayStatus.CHECKING || gatewayStatus === GatewayStatus.COLLECTING_USER_INFORMATION;

  const value: CivicContextType = {
    isVerified,
    isLoading,
    requestGatewayToken,
    gatewayToken,
    gatewayStatus,
  };

  return (
    <CivicContext.Provider value={value}>
      {children}
    </CivicContext.Provider>
  );
};

// Main provider that wraps with SolanaGatewayProvider
export const CivicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  if (!wallet?.publicKey) {
    // Return children without Civic verification if wallet not connected
    return (
      <CivicContext.Provider value={{
        isVerified: false,
        isLoading: false,
        requestGatewayToken: () => console.warn('Wallet not connected'),
        gatewayToken: null,
        gatewayStatus: GatewayStatus.NOT_REQUESTED,
      }}>
        {children}
      </CivicContext.Provider>
    );
  }

  return (
    <GatewayProvider
      wallet={wallet as any}
      connection={connection}
      cluster={CLUSTER as any}
      gatekeeperNetwork={GATEKEEPER_NETWORK}
      options={{
        autoShowModal: false, // We'll control when to show the modal
      }}
    >
      <CivicInnerProvider>
        {children}
      </CivicInnerProvider>
    </GatewayProvider>
  );
};