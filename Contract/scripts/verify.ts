import { run } from "hardhat";

async function main() {
  // Replace these addresses with your actual deployed contract addresses
  const mockTokenAddress = "0x8e01417cbdAE47890e26625BaDA69Eea8D294475"; // From your deployment output
  const deployerAddress = "0x0E3F90102c4097afDD35A5ef33Dfc5b421494945"; // From your deployment output

  console.log("Verifying MockERC20 on Lisk Sepolia...");
  try {
    await run("verify:verify", {
      address: mockTokenAddress,
      constructorArguments: [
        "Mock USDC",      // name
        "mUSDC",          // symbol
        18,               // decimals
        deployerAddress   // owner
      ],
      network: "liskTestnet"
    });
    console.log("MockERC20 verified successfully");
  } catch (error) {
    console.error("Error verifying MockERC20:", error);
  }

  // Add other contract verifications here when you have their addresses
  // Example for ScoreRegistry:
  // console.log("Verifying ScoreRegistry...");
  // try {
  //   await run("verify:verify", {
  //     address: "SCORE_REGISTRY_ADDRESS",
  //     constructorArguments: [
  //       "SAVINGS_POOL_ADDRESS",
  //       deployerAddress
  //     ],
  //   });
  //   console.log("ScoreRegistry verified successfully");
  // } catch (error) {
  //   console.error("Error verifying ScoreRegistry:", error);
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
