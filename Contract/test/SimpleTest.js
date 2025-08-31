const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Test", function () {
  it("Should work", async function () {
    expect(1 + 1).to.equal(2);
  });

  it("Should deploy ScoreRegistry", async function () {
    const [owner, savingsPool] = await ethers.getSigners();
    
    const ScoreRegistryFactory = await ethers.getContractFactory("ScoreRegistry");
    const scoreRegistry = await ScoreRegistryFactory.deploy(
      savingsPool.address,
      owner.address
    );
    
    expect(await scoreRegistry.savingsPool()).to.equal(savingsPool.address);
    expect(await scoreRegistry.owner()).to.equal(owner.address);
  });
});
