import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy MockERC20 for testing (replace with real stablecoin address in production)
  const MockERC20Factory = await ethers.getContractFactory("MockERC20");
  const mockToken = await MockERC20Factory.deploy(
    "Mock USDC",
    "mUSDC",
    18,
    deployer.address
  );
  await mockToken.waitForDeployment();
  console.log("MockERC20 deployed to:", await mockToken.getAddress());

  // Step 1: Deploy a minimal ScoreRegistry with deployer as temporary pool
  // We'll deploy a second one later with the correct pool address
  const ScoreRegistryFactory = await ethers.getContractFactory("ScoreRegistry");
  const tempScoreRegistry = await ScoreRegistryFactory.deploy(
    deployer.address, // Use deployer as temporary pool address
    deployer.address
  );
  await tempScoreRegistry.waitForDeployment();
  console.log("Temporary ScoreRegistry deployed to:", await tempScoreRegistry.getAddress());

  // Step 2: Deploy SavingsPool with the temporary ScoreRegistry and no RewardVault
  const SavingsPoolFactory = await ethers.getContractFactory("SavingsPool");
  const savingsPool = await SavingsPoolFactory.deploy(
    await mockToken.getAddress(),
    await tempScoreRegistry.getAddress(),
    ethers.ZeroAddress, // No reward vault initially (allowed)
    ethers.ZeroAddress, // No treasury initially
    0, // No fees initially
    deployer.address
  );
  await savingsPool.waitForDeployment();
  console.log("SavingsPool deployed to:", await savingsPool.getAddress());

  // Step 3: Deploy final ScoreRegistry with correct SavingsPool address
  const scoreRegistry = await ScoreRegistryFactory.deploy(
    await savingsPool.getAddress(),
    deployer.address
  );
  await scoreRegistry.waitForDeployment();
  console.log("ScoreRegistry deployed to:", await scoreRegistry.getAddress());

  // Step 4: Deploy RewardVault with the SavingsPool address
  const RewardVaultFactory = await ethers.getContractFactory("RewardVault");
  const rewardVault = await RewardVaultFactory.deploy(
    await savingsPool.getAddress(),
    deployer.address
  );
  await rewardVault.waitForDeployment();
  console.log("RewardVault deployed to:", await rewardVault.getAddress());

  // Step 5: Deploy final SavingsPool with all correct addresses
  const finalSavingsPool = await SavingsPoolFactory.deploy(
    await mockToken.getAddress(),
    await scoreRegistry.getAddress(),
    await rewardVault.getAddress(),
    ethers.ZeroAddress, // No treasury initially
    0, // No fees initially
    deployer.address
  );
  await finalSavingsPool.waitForDeployment();
  console.log("Final SavingsPool deployed to:", await finalSavingsPool.getAddress());

  // Mint some tokens for testing
  await mockToken.mint(deployer.address, ethers.parseUnits("1000000", 18));
  console.log("Minted 1M tokens to deployer");

  console.log("\n=== Deployment Summary ===");
  console.log("MockERC20:", await mockToken.getAddress());
  console.log("ScoreRegistry:", await scoreRegistry.getAddress());
  console.log("RewardVault:", await rewardVault.getAddress());
  console.log("SavingsPool:", await finalSavingsPool.getAddress());
  console.log("Deployer:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
