// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IRewardVault
 * @notice Interface for the MicroSave reward points system
 * @dev Manages point allocation and claiming for consistent savers
 */
interface IRewardVault {
    // Events
    event PointsAwarded(address indexed user, uint256 amount, uint16 streak);
    event PointsClaimed(address indexed user, uint256 amount);

    // Errors
    error OnlyPool();
    error InsufficientPoints();
    error InvalidAmount();

    /**
     * @notice Called by SavingsPool on each deposit day
     * @param user User who made the deposit
     * @param streak Current streak days
     */
    function onDepositDay(address user, uint16 streak) external;

    /**
     * @notice Claim accumulated points (burns them)
     * @param amount Amount of points to claim
     */
    function claimPoints(uint256 amount) external;

    /**
     * @notice Get user's current point balance
     * @param user User address
     * @return Current point balance
     */
    function getPoints(address user) external view returns (uint256);

    // State variables
    function points(address user) external view returns (uint256);
    function savingsPool() external view returns (address);
}
