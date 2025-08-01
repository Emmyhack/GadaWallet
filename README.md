# 🛡️ Gada Wallet: Secure Digital Inheritance on Solana

A modern, professional digital inheritance platform built on Solana blockchain that enables users to securely manage and transfer their SOL and SPL tokens to designated heirs. Built with a custom Solana smart contract (Anchor framework) and a beautiful React/TypeScript frontend.

![Gada Wallet](https://img.shields.io/badge/Solana-14C33D?style=for-the-badge&logo=solana&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔐 Secure Inheritance Management
- **Time-Based Claims**: Heirs can only claim assets after a set period of owner inactivity (default: 1 year)
- **Smart Contract Security**: Built on Solana with audited smart contracts
- **Multiple Heirs**: Designate multiple beneficiaries for different assets
- **Activity Updates**: Owners can update their activity to prevent premature claims

### 💰 Asset Management
- **SOL Support**: Native Solana token inheritance
- **SPL Token Support**: Any SPL token can be designated for inheritance
- **Batch Transfers**: Efficiently send assets to multiple recipients in one transaction
- **Real-time Tracking**: Monitor inheritance status and activity levels

### 🎨 Modern User Experience
- **Professional Design**: Beautiful, responsive interface with glass morphism effects
- **Dark Theme**: Eye-friendly dark mode optimized for extended use
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear visual feedback

### 🔗 Wallet Integration
- **Multi-Wallet Support**: Connect with Phantom, Solflare, and other Solana wallets
- **Secure Transactions**: All operations require wallet signatures
- **Real-time Status**: Live updates on transaction status and wallet connection

## 🏗️ Architecture

### Smart Contract (Backend)
- **Framework**: Anchor (Rust)
- **Network**: Solana Devnet/Mainnet
- **Program ID**: `Gf4b24oCZ6xGdVj5HyKfDBZKrd3JUuhQ87ApMAyg87t5`

### Frontend Application
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context + Hooks
- **Wallet Integration**: @solana/wallet-adapter

### Key Components
```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx      # Navigation with wallet connection
├── pages/              # Main application pages
│   ├── LandingPageStitch.tsx  # Modern landing page
│   ├── Dashboard.tsx          # Main dashboard with stats
│   ├── AddHeir.tsx           # Add new heirs
│   ├── ClaimAssets.tsx       # Claim inherited assets
│   ├── UpdateActivity.tsx    # Update activity status
│   └── BatchTransfer.tsx     # Batch transfer functionality
├── contexts/           # React contexts
│   └── WalletContext.tsx     # Wallet connection management
├── lib/               # Utility libraries
│   └── anchor.ts      # Anchor program integration
└── styles/            # Global styles and design system
```

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) or npm
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://book.anchor-lang.com/getting_started/installation.html)
- [Rust](https://www.rust-lang.org/tools/install)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/gada-wallet.git
   cd gada-wallet
   ```

2. **Install Backend Dependencies**
   ```bash
   cd gada
   yarn install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   yarn install
   ```

4. **Configure Solana Network**
   ```bash
   solana config set --url devnet
   ```

5. **Build & Deploy Smart Contract**
   ```bash
   cd gada
   anchor build
   anchor deploy
   ```

6. **Start Frontend Development Server**
   ```bash
   cd frontend
   yarn dev
   ```

7. **Open Application**
   Visit [http://localhost:5173](http://localhost:5173) in your browser

## 📱 Usage Guide

### Getting Started
1. **Connect Wallet**: Use Phantom, Solflare, or any Solana wallet
2. **Add Heirs**: Designate beneficiaries and specify assets
3. **Set Conditions**: Configure inheritance rules and time periods
4. **Monitor Activity**: Keep track of your inheritance plan

### Key Features

#### Dashboard
- View wallet balance and protected assets
- Monitor heir status and activity levels
- Quick access to all main functions
- Real-time statistics and updates

#### Add Heirs
- Support for both SOL and SPL tokens
- Multiple heirs per asset type
- Flexible amount specifications
- Common token address shortcuts

#### Claim Assets
- View all claimable assets
- Status indicators (pending, claimable, claimed)
- Time remaining calculations
- One-click claiming process

#### Update Activity
- Reset inheritance timers
- Prevent premature claims
- Bulk update functionality
- Activity history tracking

#### Batch Transfer
- Send to multiple recipients
- Support for SOL and SPL tokens
- Cost-effective transactions
- Transfer summary and validation

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#a855f7 to #9333ea)
- **Accent**: Orange gradient (#f97316 to #ea580c)
- **Success**: Green gradient (#22c55e to #16a34a)
- **Warning**: Yellow gradient (#f59e0b to #d97706)
- **Error**: Red gradient (#ef4444 to #dc2626)

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Monospace**: JetBrains Mono
- **Display Font**: Poppins

### Components
- **Glass Morphism**: Modern translucent effects
- **Gradient Buttons**: Eye-catching call-to-action elements
- **Status Indicators**: Clear visual feedback
- **Responsive Cards**: Adaptive layout components

## 🔧 Development

### Project Structure
```
gada-wallet/
├── gada/                    # Smart contract (Anchor)
│   ├── programs/           # Solana programs
│   ├── tests/              # Contract tests
│   └── migrations/         # Database migrations
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── contexts/       # React contexts
│   │   ├── lib/           # Utility functions
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── package.json       # Dependencies
└── README.md              # Project documentation
```

### Available Scripts

#### Frontend
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

#### Backend
```bash
anchor build      # Build smart contract
anchor deploy     # Deploy to network
anchor test       # Run tests
```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_SOLANA_NETWORK=devnet
VITE_PROGRAM_ID=Gf4b24oCZ6xGdVj5HyKfDBZKrd3JUuhQ87ApMAyg87t5
```

## 🔒 Security Features

### Smart Contract Security
- **Access Control**: Only designated heirs can claim assets
- **Time Locks**: Enforced inactivity periods
- **Owner Verification**: Secure ownership validation
- **Reentrancy Protection**: Prevents attack vectors

### Frontend Security
- **Wallet Integration**: Secure wallet connection
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Graceful error management
- **Transaction Confirmation**: User confirmation for all actions

## 🌐 Network Support

### Devnet (Development)
- **RPC Endpoint**: https://api.devnet.solana.com
- **Program ID**: `Gf4b24oCZ6xGdVj5HyKfDBZKrd3JUuhQ87ApMAyg87t5`
- **Use Case**: Testing and development

### Mainnet (Production)
- **RPC Endpoint**: https://api.mainnet-beta.solana.com
- **Program ID**: [To be deployed]
- **Use Case**: Production deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write comprehensive tests
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Solana Foundation** for the blockchain infrastructure
- **Anchor Framework** for smart contract development
- **React Team** for the frontend framework
- **Tailwind CSS** for the styling system
- **Lucide React** for the beautiful icons

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/your-username/gada-wallet/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/gada-wallet/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/gada-wallet/discussions)
- **Email**: support@gadawallet.com

---

**Built with ❤️ for the Solana community**

*Gada Wallet - Securing your digital legacy on Solana*
