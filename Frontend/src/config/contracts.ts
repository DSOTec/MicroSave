// Contract addresses for frontend integration
export const CONTRACT_ADDRESSES = {
  MockERC20: "0x401A13415314b516079f017D79F0457C9E2A5B0D",
  SavingsPool: "0x925E885281d502883f1e75bd070BA45E30792CeF", 
  ScoreRegistry: "0xf005ae51A9Ff6B3f3D6A41A640620450207B8758",
  RewardVault: "0xF04CE75D93186180aa807242a6e130d59f96FA1B"
};

export const NETWORK_CONFIG = {
  chainId: 4202,
  name: "Lisk Sepolia",
  rpcUrl: "https://rpc.sepolia-api.lisk.com",
  explorerUrl: "https://sepolia-blockscout.lisk.com"
};

// Essential ABI functions for frontend integration
export const SAVINGS_POOL_ABI = [
  // Read functions
  "function balances(address user) view returns (uint256)",
  "function totalDeposits() view returns (uint256)",
  "function depositFeeBps() view returns (uint16)",
  "function getUserDepositDays(address user) view returns (uint40[])",
  
  // Write functions
  "function deposit(uint256 amount)",
  "function depositWithPermit(uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
  "function withdraw(uint256 amount)",
  "function withdrawAll()",
  
  // Events
  "event Deposit(address indexed user, uint256 amount, uint256 fee, uint40 dayIndex)",
  "event Withdraw(address indexed user, uint256 amount)"
];

export const SCORE_REGISTRY_ABI = [
  // Read functions
  "function getUserScore(address user) view returns (uint16)",
  "function getUserStreak(address user) view returns (uint16)",
  "function getUserStats(address user) view returns (uint16 score, uint16 streak, uint8 freq30)",
  
  // Events
  "event ScoreSet(address indexed user, uint16 score, uint16 streak, uint8 freq30)"
];

export const REWARD_VAULT_ABI = [
  // Read functions
  "function points(address user) view returns (uint256)",
  "function POINTS_PER_DEPOSIT() view returns (uint256)",
  "function STREAK_BONUS_POINTS() view returns (uint256)",
  
  // Events
  "event PointsAwarded(address indexed user, uint256 points, uint16 streak)"
];

export const MOCK_ERC20_ABI = [
  // Standard ERC20
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  
  // Permit (EIP-2612)
  "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
  "function nonces(address owner) view returns (uint256)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
  
  // Mock functions
  "function mint(address to, uint256 amount)",
  "function faucet(uint256 amount)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Helper function to get contract instance (for ethers.js)
export function getContractConfig(contractName: keyof typeof CONTRACT_ADDRESSES) {
  const address = CONTRACT_ADDRESSES[contractName];
  let abi;
  
  switch (contractName) {
    case 'SavingsPool':
      abi = SAVINGS_POOL_ABI;
      break;
    case 'ScoreRegistry':
      abi = SCORE_REGISTRY_ABI;
      break;
    case 'RewardVault':
      abi = REWARD_VAULT_ABI;
      break;
    case 'MockERC20':
      abi = MOCK_ERC20_ABI;
      break;
    default:
      throw new Error(`Unknown contract: ${contractName}`);
  }
  
  return { address, abi };
}
