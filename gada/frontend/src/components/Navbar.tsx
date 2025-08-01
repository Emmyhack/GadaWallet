import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Menu, 
  X, 
  Shield, 
  Users, 
  Send, 
  Download, 
  RefreshCw, 
  Home
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: Shield },
    { name: 'Add Heir', href: '/add-heir', icon: Users },
    { name: 'Claim Assets', href: '/claim-assets', icon: Download },
    { name: 'Update Activity', href: '/update-activity', icon: RefreshCw },
    { name: 'Batch Transfer', href: '/batch-transfer', icon: Send },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-40 bg-glass-dark backdrop-blur-md border-b border-glass-border">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">Gada Wallet</h1>
              <p className="text-xs text-dark-400">Secure Digital Inheritance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href) ? 'nav-link-active' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status */}
            {connected && publicKey && (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="status-dot-success"></div>
                  <span className="text-sm text-dark-300">Connected</span>
                </div>
                <div className="address-display">
                  {formatAddress(publicKey.toString())}
                </div>
              </div>
            )}

            {/* Wallet Button */}
            <div className="wallet-adapter-wrapper">
              <WalletMultiButton className="wallet-button" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-glass-light transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-glass-dark border-t border-glass-border rounded-b-xl">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href) ? 'nav-link-active' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Wallet Status */}
              {connected && publicKey && (
                <div className="px-4 py-3 border-t border-dark-700 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="status-dot-success"></div>
                      <span className="text-sm text-dark-300">Connected</span>
                    </div>
                    <div className="address-display">
                      {formatAddress(publicKey.toString())}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 