# MicroSave Frontend Integration Guide

## Contract Addresses (Lisk Sepolia Testnet)

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| **SavingsPool** | `0x925E885281d502883f1e75bd070BA45E30792CeF` | [View on Explorer](https://sepolia-blockscout.lisk.com/address/0x925E885281d502883f1e75bd070BA45E30792CeF) |
| **ScoreRegistry** | `0xf005ae51A9Ff6B3f3D6A41A640620450207B8758` | [View on Explorer](https://sepolia-blockscout.lisk.com/address/0xf005ae51A9Ff6B3f3D6A41A640620450207B8758) |
| **RewardVault** | `0xF04CE75D93186180aa807242a6e130d59f96FA1B` | [View on Explorer](https://sepolia-blockscout.lisk.com/address/0xF04CE75D93186180aa807242a6e130d59f96FA1B) |
| **MockERC20** | `0x401A13415314b516079f017D79F0457C9E2A5B0D` | [View on Explorer](https://sepolia-blockscout.lisk.com/address/0x401A13415314b516079f017D79F0457C9E2A5B0D) |

## Network Configuration

```typescript
const LISK_SEPOLIA = {
  chainId: 4202,
  name: "Lisk Sepolia",
  rpcUrl: "https://rpc.sepolia-api.lisk.com",
  explorerUrl: "https://sepolia-blockscout.lisk.com"
};
```

## Quick Integration Examples

### 1. Connect to SavingsPool

```typescript
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, SAVINGS_POOL_ABI } from './contracts';

// Connect to contract
const provider = new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com");
const savingsPool = new ethers.Contract(
  CONTRACT_ADDRESSES.SavingsPool,
  SAVINGS_POOL_ABI,
  provider
);

// Read user balance
const userBalance = await savingsPool.balances(userAddress);
console.log("User balance:", ethers.formatUnits(userBalance, 18));
```

### 2. Make a Deposit

```typescript
// With signer for write operations
const signer = new ethers.Wallet(privateKey, provider);
const savingsPoolWithSigner = savingsPool.connect(signer);

// Approve token first
const mockToken = new ethers.Contract(
  CONTRACT_ADDRESSES.MockERC20,
  MOCK_ERC20_ABI,
  signer
);

const amount = ethers.parseUnits("100", 18); // 100 tokens
await mockToken.approve(CONTRACT_ADDRESSES.SavingsPool, amount);

// Make deposit
const tx = await savingsPoolWithSigner.deposit(amount);
await tx.wait();
```

### 3. Check User Score

```typescript
const scoreRegistry = new ethers.Contract(
  CONTRACT_ADDRESSES.ScoreRegistry,
  SCORE_REGISTRY_ABI,
  provider
);

const [score, streak, freq30] = await scoreRegistry.getUserStats(userAddress);
console.log(`Score: ${score}, Streak: ${streak}, Frequency: ${freq30}`);
```

### 4. Check Reward Points

```typescript
const rewardVault = new ethers.Contract(
  CONTRACT_ADDRESSES.RewardVault,
  REWARD_VAULT_ABI,
  provider
);

const points = await rewardVault.points(userAddress);
console.log("User points:", points.toString());
```

## Key Features for Frontend

### SavingsPool Functions
- **`deposit(amount)`** - Make a deposit
- **`withdraw(amount)`** - Withdraw specific amount
- **`withdrawAll()`** - Withdraw all funds
- **`balances(user)`** - Get user balance
- **`getUserDepositDays(user)`** - Get deposit history

### ScoreRegistry Functions
- **`getUserScore(user)`** - Get current SCS score (0-100)
- **`getUserStreak(user)`** - Get current streak days
- **`getUserStats(user)`** - Get comprehensive stats

### RewardVault Functions
- **`points(user)`** - Get user's reward points
- **Constants**: `POINTS_PER_DEPOSIT` (5), `STREAK_BONUS_POINTS` (20)

### MockERC20 Functions
- **`faucet(amount)`** - Get test tokens (anyone can call)
- **`balanceOf(user)`** - Check token balance
- **`approve(spender, amount)`** - Approve spending

## Event Listening

```typescript
// Listen for deposits
savingsPool.on("Deposit", (user, amount, fee, dayIndex) => {
  console.log(`${user} deposited ${ethers.formatUnits(amount, 18)} tokens`);
});

// Listen for score updates
scoreRegistry.on("ScoreSet", (user, score, streak, freq30) => {
  console.log(`${user} new score: ${score}, streak: ${streak}`);
});
```

## Testing with Faucet

```typescript
// Get test tokens
const mockToken = new ethers.Contract(
  CONTRACT_ADDRESSES.MockERC20,
  MOCK_ERC20_ABI,
  signer
);

// Get 1000 test tokens
await mockToken.faucet(ethers.parseUnits("1000", 18));
```

## Important Notes

1. **Network**: All contracts are deployed on **Lisk Sepolia Testnet** (Chain ID: 4202)
2. **Test Tokens**: Use the `faucet()` function to get test USDC tokens
3. **Verification**: MockERC20 is verified, others pending verification
4. **Fees**: Currently set to 0 basis points (no fees)
5. **Decimals**: All amounts use 18 decimals
