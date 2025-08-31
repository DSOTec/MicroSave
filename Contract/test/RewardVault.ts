import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { RewardVault } from "../typechain-types";

describe("RewardVault", function () {
  let rewardVault: RewardVault;
  let owner: SignerWithAddress;
  let savingsPool: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, savingsPool, user1, user2] = await ethers.getSigners();

    const RewardVaultFactory = await ethers.getContractFactory("RewardVault");
    rewardVault = await RewardVaultFactory.deploy(
      savingsPool.address,
      owner.address
    );
  });

  describe("Deployment", function () {
    it("Should set the correct savings pool", async function () {
      expect(await rewardVault.savingsPool()).to.equal(savingsPool.address);
    });

    it("Should set the correct owner", async function () {
      expect(await rewardVault.owner()).to.equal(owner.address);
    });

    it("Should have correct constants", async function () {
      expect(await rewardVault.POINTS_PER_DEPOSIT()).to.equal(5);
      expect(await rewardVault.STREAK_BONUS_POINTS()).to.equal(20);
      expect(await rewardVault.STREAK_MILESTONE()).to.equal(7);
    });
  });

  describe("Access Control", function () {
    it("Should only allow savings pool to award points", async function () {
      await expect(rewardVault.connect(user1).onDepositDay(user1.address, 1))
        .to.be.revertedWithCustomError(rewardVault, "OnlyPool");
    });

    it("Should allow savings pool to award points", async function () {
      await expect(rewardVault.connect(savingsPool).onDepositDay(user1.address, 1))
        .to.emit(rewardVault, "PointsAwarded")
        .withArgs(user1.address, 5, 1);
    });
  });

  describe("Point Awarding", function () {
    it("Should award base points for deposit", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 1);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(5);
      expect(await rewardVault.points(user1.address)).to.equal(5);
    });

    it("Should award streak bonus at milestone", async function () {
      await expect(rewardVault.connect(savingsPool).onDepositDay(user1.address, 7))
        .to.emit(rewardVault, "PointsAwarded")
        .withArgs(user1.address, 25, 7); // 5 base + 20 bonus
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(25);
    });

    it("Should award streak bonus at multiple milestones", async function () {
      // 14-day streak (2 milestones)
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 14);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(25); // 5 base + 20 bonus
    });

    it("Should not award bonus for non-milestone streaks", async function () {
      // 6-day streak (no milestone)
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 6);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(5); // Only base points
    });

    it("Should accumulate points over multiple deposits", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 1);
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 2);
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 3);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(15); // 3 * 5 points
    });

    it("Should handle zero streak", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 0);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(5); // Base points only
    });

    it("Should reject zero address user", async function () {
      await expect(rewardVault.connect(savingsPool).onDepositDay(ethers.ZeroAddress, 1))
        .to.be.revertedWithCustomError(rewardVault, "InvalidAmount");
    });
  });

  describe("Point Claiming", function () {
    beforeEach(async function () {
      // Award some points first
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 1);
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 7); // Milestone bonus
    });

    it("Should allow users to claim points", async function () {
      const initialPoints = await rewardVault.getPoints(user1.address);
      const claimAmount = 10n;
      
      await expect(rewardVault.connect(user1).claimPoints(claimAmount))
        .to.emit(rewardVault, "PointsClaimed")
        .withArgs(user1.address, claimAmount);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(initialPoints - claimAmount);
    });

    it("Should allow claiming all points", async function () {
      const allPoints = await rewardVault.getPoints(user1.address);
      
      await rewardVault.connect(user1).claimPoints(allPoints);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(0);
    });

    it("Should revert on insufficient points", async function () {
      const userPoints = await rewardVault.getPoints(user1.address);
      
      await expect(rewardVault.connect(user1).claimPoints(userPoints + 1n))
        .to.be.revertedWithCustomError(rewardVault, "InsufficientPoints");
    });

    it("Should revert on zero claim amount", async function () {
      await expect(rewardVault.connect(user1).claimPoints(0))
        .to.be.revertedWithCustomError(rewardVault, "InvalidAmount");
    });

    it("Should revert when user has no points", async function () {
      await expect(rewardVault.connect(user2).claimPoints(1))
        .to.be.revertedWithCustomError(rewardVault, "InsufficientPoints");
    });
  });

  describe("Multiple Users", function () {
    it("Should track points separately for different users", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 1);
      await rewardVault.connect(savingsPool).onDepositDay(user2.address, 7);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(5);
      expect(await rewardVault.getPoints(user2.address)).to.equal(25);
    });

    it("Should allow independent claiming", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 1);
      await rewardVault.connect(savingsPool).onDepositDay(user2.address, 1);
      
      await rewardVault.connect(user1).claimPoints(3);
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(2);
      expect(await rewardVault.getPoints(user2.address)).to.equal(5); // Unchanged
    });
  });

  describe("Streak Milestone Logic", function () {
    it("Should award bonus for exact milestones", async function () {
      const milestones = [7, 14, 21, 28, 35];
      
      for (const milestone of milestones) {
        await rewardVault.connect(savingsPool).onDepositDay(user1.address, milestone);
      }
      
      // 5 deposits * (5 base + 20 bonus) = 125 points
      expect(await rewardVault.getPoints(user1.address)).to.equal(125);
    });

    it("Should not award bonus for non-exact milestones", async function () {
      const nonMilestones = [1, 2, 3, 4, 5, 6, 8, 9, 10, 13, 15];
      
      for (const streak of nonMilestones) {
        await rewardVault.connect(savingsPool).onDepositDay(user2.address, streak);
      }
      
      // Only base points: 11 deposits * 5 = 55 points
      expect(await rewardVault.getPoints(user2.address)).to.equal(55);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle large streak numbers", async function () {
      await rewardVault.connect(savingsPool).onDepositDay(user1.address, 700); // 100 milestones
      
      expect(await rewardVault.getPoints(user1.address)).to.equal(25); // 5 base + 20 bonus
    });

    it("Should handle maximum uint16 streak", async function () {
      const maxStreak = 65535; // Max uint16
      if (maxStreak % 7 === 0) {
        await rewardVault.connect(savingsPool).onDepositDay(user1.address, maxStreak);
        expect(await rewardVault.getPoints(user1.address)).to.equal(25);
      } else {
        await rewardVault.connect(savingsPool).onDepositDay(user1.address, maxStreak);
        expect(await rewardVault.getPoints(user1.address)).to.equal(5);
      }
    });
  });
});
