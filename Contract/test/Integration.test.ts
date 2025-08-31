import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { 
  SavingsPool, 
  ScoreRegistry, 
  RewardVault, 
  MockERC20 
} from "../typechain-types";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-chai-matchers";

describe("MicroSave Integration", function () {
  let savingsPool: SavingsPool;
  let scoreRegistry: ScoreRegistry;
  let rewardVault: RewardVault;
  let mockToken: MockERC20;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let treasury: SignerWithAddress;

  const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18);
  const DEPOSIT_AMOUNT = ethers.parseUnits("100", 18);

  beforeEach(async function () {
    [owner, user1, user2, treasury] = await ethers.getSigners();

    // Deploy MockERC20
    const MockERC20Factory = await ethers.getContractFactory("MockERC20");
    mockToken = await MockERC20Factory.deploy(
      "Mock USDC",
      "mUSDC",
      18,
      owner.address
    );

    // Get the current nonce to predict addresses accurately
    const currentNonce = await ethers.provider.getTransactionCount(owner.address);
    
    // Calculate addresses for ScoreRegistry (nonce), RewardVault (nonce+1), SavingsPool (nonce+2)
    const scoreRegistryAddress = ethers.getCreateAddress({
      from: owner.address,
      nonce: currentNonce
    });
    const rewardVaultAddress = ethers.getCreateAddress({
      from: owner.address,
      nonce: currentNonce + 1
    });
    const savingsPoolAddress = ethers.getCreateAddress({
      from: owner.address,
      nonce: currentNonce + 2
    });

    // Deploy ScoreRegistry with predicted SavingsPool address
    const ScoreRegistryFactory = await ethers.getContractFactory("ScoreRegistry");
    scoreRegistry = await ScoreRegistryFactory.deploy(
      savingsPoolAddress,
      owner.address
    );

    // Deploy RewardVault with predicted SavingsPool address
    const RewardVaultFactory = await ethers.getContractFactory("RewardVault");
    rewardVault = await RewardVaultFactory.deploy(
      savingsPoolAddress,
      owner.address
    );

    // Deploy SavingsPool with the actual contract addresses
    const SavingsPoolFactory = await ethers.getContractFactory("SavingsPool");
    savingsPool = await SavingsPoolFactory.deploy(
      mockToken.target,
      scoreRegistryAddress,
      rewardVaultAddress,
      treasury.address,
      0, // No fee initially
      owner.address
    );

    // Mint tokens and approve
    await mockToken.mint(user1.address, INITIAL_SUPPLY);
    await mockToken.mint(user2.address, INITIAL_SUPPLY);
    await mockToken.connect(user1).approve(await savingsPool.getAddress(), INITIAL_SUPPLY);
    await mockToken.connect(user2).approve(await savingsPool.getAddress(), INITIAL_SUPPLY);
  });

  describe("Complete User Journey", function () {
    it("Should handle a complete 30-day savings journey", async function () {
      // Week 1: Daily deposits (7 days)
      for (let day = 0; day < 7; day++) {
        if (day > 0) await time.increase(24 * 60 * 60); // Increase by 1 day
        await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      }

      // Check after week 1
      let score = await scoreRegistry.getUserScore(user1.address);
      let streak = await scoreRegistry.getUserStreak(user1.address);
      let points = await rewardVault.getPoints(user1.address);
      
      expect(streak).to.equal(7);
      expect(score).to.equal(21); // (7 * 2) + 7 = 21
      expect(points).to.equal(55); // 7 * 5 + 20 (streak bonus at day 7)

      // Week 2: Skip 2 days, then deposit (streak broken)
      await time.increase(2 * 24 * 60 * 60); // Skip 2 days
      await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);

      score = await scoreRegistry.getUserScore(user1.address);
      streak = await scoreRegistry.getUserStreak(user1.address);
      
      expect(streak).to.equal(1); // Streak reset due to gap
      expect(score).to.be.lessThan(21); // Score should decrease

      // Week 3-4: Build new streak
      for (let day = 0; day < 14; day++) {
        if (day > 0) await time.increase(24 * 60 * 60); // Increase by 1 day
        await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      }

      streak = await scoreRegistry.getUserStreak(user1.address);
      points = await rewardVault.getPoints(user1.address);
      
      expect(streak).to.equal(14); // 14-day new streak
      // Points should include multiple streak bonuses
      expect(points).to.be.greaterThan(100);

      // Verify total balance
      const expectedBalance = DEPOSIT_AMOUNT * 22n; // 22 deposits (7 + 1 + 14)
      expect(await savingsPool.balances(user1.address)).to.equal(expectedBalance);
    });

    it("Should handle multiple users with different patterns", async function () {
      // User1: Consistent daily deposits
      for (let day = 0; day < 10; day++) {
        if (day > 0) await time.increase(24 * 60 * 60);
        await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      }

      // User2: Weekly deposits (reset time for user2)
      for (let week = 0; week < 4; week++) {
        if (week > 0) await time.increase(7 * 24 * 60 * 60);
        await savingsPool.connect(user2).deposit(DEPOSIT_AMOUNT * 2n);
      }

      const user1Score = await scoreRegistry.getUserScore(user1.address);
      const user1Streak = await scoreRegistry.getUserStreak(user1.address);
      const user1Points = await rewardVault.getPoints(user1.address);

      const user2Score = await scoreRegistry.getUserScore(user2.address);
      const user2Streak = await scoreRegistry.getUserStreak(user2.address);
      const user2Points = await rewardVault.getPoints(user2.address);

      // User1 should have higher score and streak
      expect(user1Score).to.be.greaterThan(user2Score);
      expect(user1Streak).to.be.greaterThan(user2Streak);
      expect(user1Points).to.be.greaterThan(user2Points);

      // But User2 should have higher balance per deposit
      expect(await savingsPool.balances(user2.address)).to.equal(DEPOSIT_AMOUNT * 8n);
      expect(await savingsPool.balances(user1.address)).to.equal(DEPOSIT_AMOUNT * 10n);
    });
  });

  describe("Withdrawal Scenarios", function () {
    beforeEach(async function () {
      // Setup: User has made several deposits
      for (let day = 0; day < 5; day++) {
        if (day > 0) await time.increase(24 * 60 * 60);
        await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      }
    });

    it("Should allow partial withdrawals without affecting score", async function () {
      const initialBalance = await savingsPool.balances(user1.address);
      const initialScore = await scoreRegistry.getUserScore(user1.address);
      const initialStreak = await scoreRegistry.getUserStreak(user1.address);

      // Withdraw half
      await savingsPool.connect(user1).withdraw(initialBalance / 2n);

      expect(await savingsPool.balances(user1.address)).to.equal(initialBalance / 2n);
      expect(await scoreRegistry.getUserScore(user1.address)).to.equal(initialScore);
      expect(await scoreRegistry.getUserStreak(user1.address)).to.equal(initialStreak);
    });

    it("Should allow full withdrawal", async function () {
      const initialBalance = await savingsPool.balances(user1.address);
      
      await savingsPool.connect(user1).withdraw(initialBalance);

      expect(await savingsPool.balances(user1.address)).to.equal(0);
      expect(await savingsPool.totalDeposits()).to.equal(0);
    });
  });

  describe("Fee Integration", function () {
    it("Should handle fees correctly across all components", async function () {
      // Set 1% fee
      await savingsPool.setFeeBps(100);

      const depositAmount = DEPOSIT_AMOUNT;
      const expectedFee = depositAmount * 100n / 10000n; // 1%
      const expectedNetAmount = depositAmount - expectedFee;

      await savingsPool.connect(user1).deposit(depositAmount);

      // Check balances
      expect(await savingsPool.balances(user1.address)).to.equal(expectedNetAmount);
      expect(await mockToken.balanceOf(treasury.address)).to.equal(expectedFee);
      expect(await savingsPool.totalDeposits()).to.equal(expectedNetAmount);

      // Score and rewards should still work normally
      expect(await scoreRegistry.getUserScore(user1.address)).to.be.greaterThan(0);
      expect(await rewardVault.getPoints(user1.address)).to.equal(5);
    });
  });

  describe("Pause/Emergency Scenarios", function () {
    it("Should handle pause correctly", async function () {
      await savingsPool.pause();

      await expect(savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT))
        .to.be.revertedWithCustomError(savingsPool, "EnforcedPause");

      await expect(savingsPool.connect(user1).withdraw(0))
        .to.be.revertedWithCustomError(savingsPool, "EnforcedPause");

      await savingsPool.unpause();

      // Should work after unpause
      await expect(savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT))
        .to.not.be.reverted;
    });

    it("Should handle emergency withdrawal", async function () {
      // First make some deposits
      await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      
      // Pause and emergency withdraw
      await savingsPool.pause();
      
      const contractBalance = await mockToken.balanceOf(await savingsPool.getAddress());
      await savingsPool.emergencyWithdraw(await mockToken.getAddress(), contractBalance);
      
      expect(await mockToken.balanceOf(owner.address)).to.be.greaterThan(0);
    });
  });

  describe("Reward Point Claims", function () {
    it("Should allow users to claim accumulated points", async function () {
      // Build up points through deposits
      for (let day = 0; day < 14; day++) {
        if (day > 0) await time.increase(24 * 60 * 60);
        await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      }

      const totalPoints = await rewardVault.getPoints(user1.address);
      expect(totalPoints).to.be.greaterThan(0);

      // Claim half the points
      const claimAmount = totalPoints / 2n;
      await expect(rewardVault.connect(user1).claimPoints(claimAmount))
        .to.emit(rewardVault, "PointsClaimed")
        .withArgs(user1.address, claimAmount);

      expect(await rewardVault.getPoints(user1.address)).to.equal(totalPoints - claimAmount);
    });
  });

  describe("Gas Efficiency", function () {
    it("Should have reasonable gas costs for deposits", async function () {
      const tx = await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      const receipt = await tx.wait();
      
      // Gas should be reasonable (adjust threshold as needed)
      expect(Number(receipt?.gasUsed || 0)).to.be.lessThan(300000);
    });

    it("Should have reasonable gas costs for same-day deposits", async function () {
      // First deposit of the day
      const tx1 = await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      const receipt1 = await tx1.wait();

      // Second deposit same day (should be cheaper)
      const tx2 = await savingsPool.connect(user1).deposit(DEPOSIT_AMOUNT);
      const receipt2 = await tx2.wait();

      expect(Number(receipt2?.gasUsed || 0)).to.be.lessThan(Number(receipt1?.gasUsed || 0));
    });
  });
});
