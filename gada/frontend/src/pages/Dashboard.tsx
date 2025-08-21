import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Coins, 
  Shield, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Plus,
  Clock,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useCivic } from '../contexts/CivicContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Dashboard: React.FC = () => {
  const { connected } = useWallet();
  const { isVerified } = useCivic();
  const [showBalance, setShowBalance] = useState(false);
  const [heirs] = useState([
    { id: 1, name: 'Sarah Johnson', address: '0x1234...5678', percentage: 60, status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
    { id: 2, name: 'Michael Chen', address: '0x8765...4321', percentage: 40, status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' }
  ]);
  const [assets] = useState([
    { id: 1, name: 'SOL', amount: '25.5', value: '$2,550', change: '+5.2%', icon: '🟣', color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'USDC', amount: '1,000', value: '$1,000', change: '+0.1%', icon: '💙', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'RAY', amount: '150', value: '$450', change: '+12.3%', icon: '🟡', color: 'from-yellow-500 to-orange-500' }
  ]);

  const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value.replace('$', '').replace(',', '')), 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse opacity-10"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-25"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-white rounded-full animate-pulse opacity-15"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome back, <span className="gradient-text glow-text">User</span>
              </h1>
              <p className="text-xl text-white/80">
                Manage your digital legacy and monitor your assets
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        {!connected ? (
          <div className="glass-card p-8 mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h3>
                  <p className="text-white/70 text-lg">Connect your wallet to access your dashboard</p>
                </div>
              </div>
              <WalletMultiButton className="btn-primary text-lg px-8 py-4" />
            </div>
          </div>
        ) : (
          <>
            {/* Verification Status */}
            {connected && !isVerified && (
              <div className="glass-card p-8 mb-8 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Identity Verification Required</h3>
                      <p className="text-white/70 text-lg">Complete identity verification to add heirs and manage assets</p>
                    </div>
                  </div>
                  <Link to="/add-heir" className="btn-primary text-lg px-8 py-4">
                    <Shield className="w-6 h-6 mr-3" />
                    Verify Identity
                  </Link>
                </div>
              </div>
            )}
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="dashboard-card group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-2">Total Value</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-white">
                        {showBalance ? `$${totalValue.toLocaleString()}` : '****'}
                      </span>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium mb-2">Active Heirs</p>
                  <p className="text-3xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    {heirs.length}
                  </p>
                </div>
              </div>

              <div className="dashboard-card group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium mb-2">Plan Status</p>
                  <p className="text-3xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    Active
                  </p>
                </div>
              </div>

              <div className="dashboard-card group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium mb-2">Last Activity</p>
                  <p className="text-3xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    2 days
                  </p>
                </div>
              </div>
            </div>

            {/* Assets Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Your Assets</h3>
                  <Link to="/batch-transfer" className="btn-secondary text-sm px-6 py-3">
                    <Plus className="w-5 h-5 mr-2" />
                    Transfer
                  </Link>
                </div>
                <div className="space-y-6">
                  {assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${asset.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {asset.icon}
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{asset.name}</p>
                          <p className="text-white/60 text-sm">{asset.amount} tokens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{asset.value}</p>
                        <p className="text-green-400 text-sm font-medium">{asset.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Your Heirs</h3>
                  <Link to="/add-heir" className="btn-secondary text-sm px-6 py-3">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Heir
                  </Link>
                </div>
                <div className="space-y-6">
                  {heirs.map((heir) => (
                    <div key={heir.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={heir.avatar} 
                          alt={heir.name}
                          className="w-12 h-12 rounded-full ring-2 ring-white/20"
                        />
                        <div>
                          <p className="text-white font-bold text-lg">{heir.name}</p>
                          <p className="text-white/60 text-sm">{heir.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{heir.percentage}%</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-green-400 text-sm font-medium">Active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/add-heir" className="dashboard-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="icon-container bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Add Heir</h4>
                  <p className="text-white/70 text-sm">Designate new beneficiaries</p>
                </Link>

                <Link to="/claim-assets" className="dashboard-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="icon-container bg-gradient-to-br from-green-500 to-blue-500 mb-4">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Claim Assets</h4>
                  <p className="text-white/70 text-sm">Access inherited assets</p>
                </Link>

                <Link to="/update-activity" className="dashboard-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="icon-container bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Update Activity</h4>
                  <p className="text-white/70 text-sm">Maintain account activity</p>
                </Link>

                <Link to="/batch-transfer" className="dashboard-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="icon-container bg-gradient-to-br from-orange-500 to-red-500 mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Batch Transfer</h4>
                  <p className="text-white/70 text-sm">Transfer multiple assets</p>
                </Link>
              </div>
            </div>

            {/* Security Status */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Security Status</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-lg font-bold">Secure</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white font-bold text-lg">Wallet Connected</p>
                    <p className="text-white/60 text-sm">Secure connection active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <Lock className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white font-bold text-lg">Smart Contracts</p>
                    <p className="text-white/60 text-sm">Verified and secure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <Shield className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-white font-bold text-lg">Inheritance Plan</p>
                    <p className="text-white/60 text-sm">Active and protected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8 mt-8">
              <h3 className="text-2xl font-bold text-white mb-8">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Activity updated successfully</p>
                    <p className="text-white/60 text-sm">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Heir Michael Chen added</p>
                    <p className="text-white/60 text-sm">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Security audit completed</p>
                    <p className="text-white/60 text-sm">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 