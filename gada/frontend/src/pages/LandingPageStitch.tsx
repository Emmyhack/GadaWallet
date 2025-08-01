import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Clock, 
  Lock, 
  Zap, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

const LandingPageStitch: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Inheritance',
      description: 'Utilize Solana\'s smart contracts for secure and transparent asset transfer with military-grade encryption.',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Users,
      title: 'Multiple Heirs',
      description: 'Designate multiple beneficiaries to receive your crypto assets with flexible distribution options.',
      gradient: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Clock,
      title: 'Time-Based Claims',
      description: 'Set specific time conditions for when heirs can claim their inheritance with customizable periods.',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: Lock,
      title: 'Smart Contracts',
      description: 'Built on Solana blockchain with audited smart contracts ensuring maximum security and reliability.',
      gradient: 'from-success-500 to-success-600'
    },
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Lightning-fast transactions with minimal fees thanks to Solana\'s high-performance blockchain.',
      gradient: 'from-warning-500 to-warning-600'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your digital inheritance from anywhere in the world with our decentralized platform.',
      gradient: 'from-error-500 to-error-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect Your Wallet',
      description: 'Securely connect your Solana wallet (Phantom, Solflare, etc.) to get started.',
      icon: Shield
    },
    {
      number: '02',
      title: 'Add Your Heirs',
      description: 'Designate beneficiaries and specify the assets they should inherit.',
      icon: Users
    },
    {
      number: '03',
      title: 'Set Conditions',
      description: 'Configure time-based conditions and inheritance rules for your assets.',
      icon: Clock
    },
    {
      number: '04',
      title: 'Rest Assured',
      description: 'Your digital legacy is now protected and will be automatically transferred when conditions are met.',
      icon: CheckCircle
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '$50M+', label: 'Assets Protected', icon: Shield },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
        </div>

        <div className="container-responsive relative z-10">
          <div className="flex flex-col items-center text-center py-20 lg:py-32">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-glass-light border border-glass-border rounded-full px-4 py-2 mb-8 animate-fade-in-down">
              <Star className="w-4 h-4 text-warning-400" />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ users worldwide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
              <span className="gradient-text">Secure Your</span>
              <br />
              <span className="text-white">Digital Legacy</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mb-8 animate-fade-in-up animation-delay-200">
              Ensure your crypto assets are securely transferred to your loved ones with our Solana-based platform. 
              Set time-based conditions and rest assured your legacy is protected.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up animation-delay-400">
              <Link
                to="/dashboard"
                className="btn-primary btn-lg group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary btn-lg">
                <span>Watch Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl animate-fade-in-up animation-delay-600">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-glass-light border border-glass-border rounded-xl mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold gradient-text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-dark-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Why Choose</span>
              <br />
              <span className="text-white">Gada Wallet?</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Our platform offers cutting-edge features designed to provide security and flexibility 
              in managing your digital inheritance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-hover p-8 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-glass-dark">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">How It</span>
              <br />
              <span className="text-white">Works</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Get started with Gada Wallet in just four simple steps. 
              Your digital legacy protection is just minutes away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 z-0"></div>
                  )}

                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-glass-light border border-glass-border rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-dark-300">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container-responsive">
          <div className="card-gradient p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Ready to Secure</span>
              <br />
              <span className="text-white">Your Legacy?</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-8">
              Join thousands of users who trust Gada Wallet to protect their digital assets. 
              Start building your secure inheritance plan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="btn-primary btn-lg group"
              >
                <span>Start Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/add-heir"
                className="btn-secondary btn-lg"
              >
                <span>Add Your First Heir</span>
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-700">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">Gada Wallet</span>
            </div>
            <div className="text-sm text-dark-400">
              © 2024 Gada Wallet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageStitch; 