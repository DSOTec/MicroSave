// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IScoreRegistry.sol";
import "./IRewardVault.sol";

/**
 * @title ISavingsPool
 * @notice Interface for the core MicroSave savings pool contract
 * @dev Handles stablecoin deposits/withdrawals and integrates with scoring system
 */
interface ISavingsPool {
    // Events
    event Deposited(address indexed user, uint256 amount, uint256 netAmount, uint40 dayIndex);
    event Withdrawn(address indexed user, uint256 amount);
    event ScoreUpdated(address indexed user, uint16 newScore, uint16 streakDays, uint8 freq30);
    event FeeUpdated(uint16 depositFeeBps);
    event TreasuryUpdated(address treasury);

    // Errors
    error InsufficientAmount();
    error InsufficientBalance();
    error InvalidToken();
    error NoPermitSupport();
    error ZeroAddress();
    error ExcessiveFee();

    /**
     * @notice Deposit stablecoin into the savings pool
     * @param amount Amount to deposit
     */
    function deposit(uint256 amount) external;

    /**
     * @notice Deposit with EIP-2612 permit (gasless approval)
     * @param amount Amount to deposit
     * @param deadline Permit deadline
     * @param v Signature parameter
     * @param r Signature parameter
     * @param s Signature parameter
     */
    function permitDeposit(
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    /**
     * @notice Withdraw stablecoin from the savings pool
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external;

    /**
     * @notice Set deposit fee (only owner)
     * @param depositFeeBps Fee in basis points (0-100)
     */
    function setFeeBps(uint16 depositFeeBps) external;

    /**
     * @notice Set treasury address (only owner)
     * @param treasury New treasury address
     */
    function setTreasury(address treasury) external;

    // View functions
    function balances(address user) external view returns (uint256);
    function totalDeposits() external view returns (uint256);
    function STABLE() external view returns (IERC20);
    function scoreRegistry() external view returns (IScoreRegistry);
    function rewardVault() external view returns (IRewardVault);
    function treasury() external view returns (address);
    function depositFeeBps() external view returns (uint16);
}
