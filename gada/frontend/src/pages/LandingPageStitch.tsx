import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Clock, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Globe,
  Award
} from 'lucide-react';

const LandingPageStitch: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Inheritance',
      description: 'Utilize Solana\'s smart contracts for secure and transparent asset transfer with military-grade encryption.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Users,
      title: 'Multiple Heirs',
      description: 'Designate multiple beneficiaries to receive your crypto assets with flexible distribution options.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Clock,
      title: 'Time-Based Claims',
      description: 'Set specific time conditions for when heirs can claim their inheritance with customizable periods.',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: Lock,
      title: 'Smart Contracts',
      description: 'Built on Solana blockchain with audited smart contracts ensuring reliability and security.',
      color: 'from-success-500 to-success-600'
    }
  ];

  const benefits = [
    'No third-party custody of your assets',
    'Instant global transfers',
    'Low transaction fees',
    'Transparent blockchain records',
    '24/7 automated execution',
    'Multi-signature security'
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Assets Secured', value: '$50M+', icon: Shield },
    { label: 'Successful Transfers', value: '100K+', icon: Zap },
    { label: 'Countries Supported', value: '150+', icon: Globe }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8">
                <Star className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">Trusted by 10,000+ users worldwide</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">Secure Your Digital Legacy</span>
                <br />
                <span className="text-neutral-100">with Blockchain Technology</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ensure your crypto assets are securely transferred to your loved ones with our Solana-based platform. 
                Set time-based conditions and rest assured your legacy is protected by smart contracts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/dashboard"
                  className="btn-primary btn-lg group"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-outline btn-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-fade-in-up animation-delay-300">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="card p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold gradient-text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Why Choose Gada Wallet?</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Our platform offers cutting-edge features designed to provide security and flexibility 
              in managing your digital inheritance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card-elevated p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-100 mb-3">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="gradient-text">Built for the Future</span>
              </h2>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                Gada Wallet leverages the power of Solana blockchain to provide fast, secure, and 
                cost-effective digital inheritance solutions. Our smart contracts ensure your assets 
                are protected and transferred exactly as you intend.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-neutral-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-300">
              <div className="card-glass p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-100 mb-4">Industry Leading Security</h3>
                  <p className="text-neutral-400 mb-6">
                    Our platform has been audited by leading security firms and built with 
                    enterprise-grade security standards.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-primary">99.9%</div>
                      <div className="text-sm text-neutral-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-primary">256-bit</div>
                      <div className="text-sm text-neutral-400">Encryption</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-primary">24/7</div>
                      <div className="text-sm text-neutral-400">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card-glass p-8 lg:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="gradient-text">Ready to Secure Your Legacy?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Gada Wallet to protect their digital assets. 
              Start building your secure inheritance plan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="btn-primary btn-lg group"
              >
                Start Now - It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/add-heir"
                className="btn-outline btn-lg"
              >
                Add Your First Heir
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageStitch; 