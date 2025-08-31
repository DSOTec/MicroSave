// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IScoreRegistry
 * @notice Interface for the Savings Consistency Score (SCS) registry
 * @dev Calculates and stores user scores based on deposit frequency and streaks
 */
interface IScoreRegistry {
    // Events
    event ScoreSet(address indexed user, uint16 score, uint16 streak, uint8 freq30);

    // Errors
    error OnlyPool();
    error InvalidUser();

    /**
     * @notice Update user's savings consistency score
     * @param user User address
     * @param userDaysFromPool Array of deposit day indices from the pool
     * @return newScore Updated score (0-100)
     * @return newStreak Current streak in days
     * @return freq30 Frequency in last 30 days
     */
    function updateScore(address user, uint40[] calldata userDaysFromPool)
        external
        returns (uint16 newScore, uint16 newStreak, uint8 freq30);

    /**
     * @notice Get user's current score
     * @param user User address
     * @return Current savings consistency score
     */
    function getUserScore(address user) external view returns (uint16);

    /**
     * @notice Get user's current streak
     * @param user User address
     * @return Current streak in days
     */
    function getUserStreak(address user) external view returns (uint16);

    /**
     * @notice Get user's frequency in last 30 days
     * @param user User address
     * @return Deposit frequency in last 30 days
     */
    function getUserFreq30(address user) external view returns (uint8);

    /**
     * @notice Get comprehensive user stats
     * @param user User address
     * @return score Current score
     * @return streak Current streak
     * @return freq30 Frequency in last 30 days
     */
    function getUserStats(address user) external view returns (uint16 score, uint16 streak, uint8 freq30);

    // State variables
    function score(address user) external view returns (uint16);
    function streakDays(address user) external view returns (uint16);
    function savingsPool() external view returns (address);
}
