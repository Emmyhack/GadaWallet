import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { 
  Wallet, 
  Menu, 
  X, 
  Shield, 
  Users, 
  Download, 
  RefreshCw, 
  Send
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { connected, wallet } = useWallet();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Shield },
    { name: 'Dashboard', href: '/dashboard', icon: Wallet },
    { name: 'Add Heir', href: '/add-heir', icon: Users },
    { name: 'Claim Assets', href: '/claim-assets', icon: Download },
    { name: 'Update Activity', href: '/update-activity', icon: RefreshCw },
    { name: 'Batch Transfer', href: '/batch-transfer', icon: Send },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-large' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all duration-300">
                <Shield className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-xl font-bold gradient-text">Gada Wallet</h1>
              <p className="text-xs text-neutral-500 hidden sm:block">Secure Digital Inheritance</p>
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
                  className={`nav-link px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href) 
                      ? 'nav-link-active bg-primary-500/10 border border-primary-500/20' 
                      : 'hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status */}
            {connected ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="status-dot-online"></div>
                  <span className="text-sm text-neutral-400">Connected</span>
                </div>
                <div className="wallet-address">
                  {wallet?.publicKey?.toString().slice(0, 4)}...{wallet?.publicKey?.toString().slice(-4)}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="status-dot-offline"></div>
                <span className="text-sm text-neutral-400">Not Connected</span>
              </div>
            )}

            {/* Connect Wallet Button */}
            <Link
              to="/dashboard"
              className="btn-primary btn-sm hidden sm:flex"
            >
              <Wallet className="w-4 h-4" />
              {connected ? 'Dashboard' : 'Connect Wallet'}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-700/50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-neutral-300" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden animate-fade-in-down">
            <div className="py-4 space-y-2 border-t border-neutral-800/50">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-500/10 border border-primary-500/20 text-primary-400'
                        : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Wallet Status */}
              <div className="px-4 py-3 border-t border-neutral-800/50 mt-4">
                {connected ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="status-dot-online"></div>
                      <span className="text-sm text-neutral-400">Wallet Connected</span>
                    </div>
                    <div className="wallet-address text-xs">
                      {wallet?.publicKey?.toString().slice(0, 6)}...{wallet?.publicKey?.toString().slice(-4)}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="status-dot-offline"></div>
                    <span className="text-sm text-neutral-400">Wallet Not Connected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 