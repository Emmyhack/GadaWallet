import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Shield, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-metamask-600 to-metamask-700 shadow-xl border-b border-metamask-500/20">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight">GadaWallet</h1>
          <p className="text-white/80 text-xs font-medium">Secure • Fast • Reliable</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          to="/" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Home
        </Link>
        <Link 
          to="/wallet" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Wallet
        </Link>
        <Link 
          to="/send" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Send
        </Link>
        <Link 
          to="/receive" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Receive
        </Link>
        <Link 
          to="/swap" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Swap
        </Link>
        <Link 
          to="/dashboard" 
          className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105"
        >
          Dashboard
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <button className="p-2 text-white/80 hover:text-white transition-colors duration-200">
          <Shield className="w-5 h-5" />
        </button>
        <button className="p-2 text-white/80 hover:text-white transition-colors duration-200">
          <Zap className="w-5 h-5" />
        </button>
        <Link
          to="/wallet"
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 hover:scale-105"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar; 