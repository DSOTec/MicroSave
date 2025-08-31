// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRewardVault.sol";

/**
 * @title RewardVault
 * @notice Manages reward points for consistent MicroSave users
 * @dev Awards 5 points per deposit day + 20 bonus points per 7-day streak milestone
 */
contract RewardVault is IRewardVault, Ownable {
    /// @notice Points awarded per deposit day
    uint256 public constant POINTS_PER_DEPOSIT = 5;
    
    /// @notice Bonus points awarded per streak milestone
    uint256 public constant STREAK_BONUS_POINTS = 20;
    
    /// @notice Streak milestone interval (every 7 days)
    uint256 public constant STREAK_MILESTONE = 7;

    /// @notice Address of the authorized savings pool
    address public immutable savingsPool;

    /// @notice User point balances
    mapping(address => uint256) public points;

    /**
     * @notice Modifier to restrict access to savings pool only
     */
    modifier onlyPool() {
        if (msg.sender != savingsPool) revert OnlyPool();
        _;
    }

    /**
     * @notice Constructor
     * @param _savingsPool Address of the savings pool contract
     * @param _owner Address of the contract owner
     */
    constructor(address _savingsPool, address _owner) Ownable(_owner) {
        if (_savingsPool == address(0)) revert OnlyPool();
        savingsPool = _savingsPool;
    }

    /**
     * @notice Called by SavingsPool on each deposit day
     * @param user User who made the deposit
     * @param streak Current streak days
     */
    function onDepositDay(address user, uint16 streak) external onlyPool {
        if (user == address(0)) revert InvalidAmount();
        
        // Award base points for deposit day
        uint256 pointsToAward = POINTS_PER_DEPOSIT;
        
        // Award streak bonus if milestone reached
        if (streak > 0 && streak % STREAK_MILESTONE == 0) {
            pointsToAward += STREAK_BONUS_POINTS;
        }
        
        // Update user points
        points[user] += pointsToAward;
        
        emit PointsAwarded(user, pointsToAward, streak);
    }

    /**
     * @notice Claim accumulated points (burns them)
     * @param amount Amount of points to claim
     */
    function claimPoints(uint256 amount) external {
        if (amount == 0) revert InvalidAmount();
        if (points[msg.sender] < amount) revert InsufficientPoints();
        
        // Burn points (no token transfer in MVP)
        unchecked {
            points[msg.sender] -= amount;
        }
        
        emit PointsClaimed(msg.sender, amount);
    }

    /**
     * @notice Get user's current point balance
     * @param user User address
     * @return Current point balance
     */
    function getPoints(address user) external view returns (uint256) {
        return points[user];
    }
}
