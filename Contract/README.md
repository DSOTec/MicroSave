# MicroSave - AI-Powered DeFi Savings dApp

A production-grade Solidity smart contract suite for decentralized savings with gamified consistency scoring and rewards.

## 🌟 Overview

MicroSave is a DeFi savings application that incentivizes consistent saving behavior through:
- **Savings Consistency Score (SCS)**: Dynamic scoring based on deposit frequency and streaks
- **Reward Points System**: Earn points for consistent deposits and streak milestones
- **Single-Asset Stablecoin Pool**: Secure, gas-efficient deposits and withdrawals
- **EIP-2612 Permit Support**: Gasless approvals for better UX

## 🏗️ Architecture

### Core Contracts

1. **SavingsPool** - Main contract for deposits/withdrawals
2. **ScoreRegistry** - Calculates and stores Savings Consistency Scores
3. **RewardVault** - Manages reward points system
4. **MockERC20** - Testing token with permit functionality

### Key Features

- **Gas Optimized**: Efficient storage patterns and minimal external calls
- **Security First**: ReentrancyGuard, Pausable, comprehensive access controls
- **Upgrade Ready**: Clean architecture suitable for UUPS upgrades
- **L2 Compatible**: Designed for Polygon, Arbitrum, Optimism

## 📊 Scoring System

### Savings Consistency Score (SCS)
```
SCS = min(100, (streakDays * 2) + freq30)
```

- **Streak**: Consecutive days with deposits (36h grace period)
- **Frequency**: Unique deposit days in last 30 days
- **Maximum Score**: 100 points

### Reward Points
- **Base**: 5 points per deposit day
- **Streak Bonus**: 20 points every 7-day milestone
- **Claimable**: Users can claim/burn points (MVP: no token transfer)

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Compilation
```bash
npx hardhat compile
```

### Testing
```bash
npx hardhat test
```

### Deployment
```bash
npx hardhat run scripts/deploy.ts
```

## 📁 Project Structure

```
contracts/
├── interfaces/
│   ├── ISavingsPool.sol      # Core pool interface
│   ├── IScoreRegistry.sol    # Scoring interface
│   └── IRewardVault.sol      # Rewards interface
├── mocks/
│   └── MockERC20.sol         # Test token with permit
├── SavingsPool.sol           # Main savings contract
├── ScoreRegistry.sol         # SCS calculation engine
└── RewardVault.sol           # Points management

test/
├── SavingsPool.test.ts       # Core functionality tests
├── ScoreRegistry.test.ts     # Scoring logic tests
├── RewardVault.test.ts       # Rewards system tests
└── Integration.test.ts       # End-to-end scenarios

scripts/
└── deploy.ts                 # Deployment script
```

## 🔧 Configuration

### Constructor Parameters

**SavingsPool**:
- `stablecoin`: ERC20 token address (e.g., USDC)
- `scoreRegistry`: ScoreRegistry contract address
- `rewardVault`: RewardVault contract address (optional)
- `treasury`: Fee collection address (optional)
- `depositFeeBps`: Fee in basis points (0-100)
- `owner`: Contract owner address

**ScoreRegistry**:
- `savingsPool`: Authorized pool address
- `owner`: Contract owner

**RewardVault**:
- `savingsPool`: Authorized pool address
- `owner`: Contract owner

### Environment Variables
```bash
# For deployment
PRIVATE_KEY=your_private_key
INFURA_PROJECT_ID=your_infura_id
ETHERSCAN_API_KEY=your_etherscan_key
```

## 🧪 Testing

### Test Coverage
- ✅ Deposit/Withdrawal functionality
- ✅ Fee handling and treasury routing
- ✅ Same-day deposit deduplication
- ✅ Scoring algorithm accuracy
- ✅ Streak calculation with grace periods
- ✅ Reward point allocation and claiming
- ✅ EIP-2612 permit integration
- ✅ Access control and security
- ✅ Pause/emergency functions
- ✅ Multi-user scenarios
- ✅ Gas efficiency tests

### Running Specific Tests
```bash
# Core functionality
npx hardhat test test/SavingsPool.test.ts

# Scoring system
npx hardhat test test/ScoreRegistry.test.ts

# Rewards system
npx hardhat test test/RewardVault.test.ts

# Integration tests
npx hardhat test test/Integration.test.ts
```

## 📈 Usage Examples

### Basic Deposit
```solidity
// Approve tokens
IERC20(stablecoin).approve(savingsPool, amount);

// Deposit
savingsPool.deposit(amount);
```

### Permit Deposit (Gasless)
```solidity
// Sign permit off-chain, then:
savingsPool.permitDeposit(amount, deadline, v, r, s);
```

### Check User Stats
```solidity
uint16 score = scoreRegistry.getUserScore(user);
uint16 streak = scoreRegistry.getUserStreak(user);
uint256 points = rewardVault.getPoints(user);
```

### Claim Rewards
```solidity
rewardVault.claimPoints(amount);
```

## 🔒 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Pausable**: Emergency pause functionality
- **Access Control**: Owner-only admin functions
- **SafeERC20**: Safe token transfers
- **Input Validation**: Comprehensive parameter checking
- **Grace Periods**: Prevents gaming of streak system

## 🌐 Deployment Addresses

### Testnet (Example)
```
MockERC20: 0x...
ScoreRegistry: 0x...
RewardVault: 0x...
SavingsPool: 0x...
```

### Mainnet
*To be deployed*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔍 Audit Status

*Pending professional audit*

## 📞 Support

For questions and support:
- GitHub Issues: [Create an issue]
- Documentation: [Link to docs]
- Discord: [Community link]

---

**⚠️ Disclaimer**: This is experimental DeFi software. Use at your own risk. Always do your own research and consider professional audits before mainnet deployment.
