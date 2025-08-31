// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./interfaces/ISavingsPool.sol";
import "./interfaces/IScoreRegistry.sol";
import "./interfaces/IRewardVault.sol";

/**
 * @title SavingsPool
 * @notice Core MicroSave savings pool for stablecoin deposits and withdrawals
 * @dev Integrates with ScoreRegistry for SCS tracking and RewardVault for points
 */
contract SavingsPool is ISavingsPool, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    /// @notice Maximum fee in basis points (1% = 100 bps)
    uint16 public constant MAX_FEE_BPS = 100;

    /// @notice The stablecoin token used for deposits/withdrawals
    IERC20 public immutable STABLE;

    /// @notice Score registry contract for SCS calculations
    IScoreRegistry public immutable scoreRegistry;

    /// @notice Reward vault contract for points (can be zero address)
    IRewardVault public immutable rewardVault;

    /// @notice Treasury address for fees (can be zero address)
    address public treasury;

    /// @notice Deposit fee in basis points (0-100)
    uint16 public depositFeeBps;

    /// @notice User balances in the pool
    mapping(address => uint256) public balances;

    /// @notice Total deposits in the pool
    uint256 public totalDeposits;

    /// @notice User deposit days (day indices: block.timestamp / 1 days)
    mapping(address => uint40[]) private _depositDays;

    /// @notice Last scored day for each user (for edge case handling)
    mapping(address => uint40) public lastScoredDay;

    /**
     * @notice Constructor
     * @param _stablecoin Address of the stablecoin token
     * @param _scoreRegistry Address of the score registry
     * @param _rewardVault Address of the reward vault (can be zero)
     * @param _treasury Address of the treasury (can be zero)
     * @param _depositFeeBps Initial deposit fee in basis points
     * @param _owner Address of the contract owner
     */
    constructor(
        address _stablecoin,
        address _scoreRegistry,
        address _rewardVault,
        address _treasury,
        uint16 _depositFeeBps,
        address _owner
    ) Ownable(_owner) {
        if (_stablecoin == address(0)) revert InvalidToken();
        if (_scoreRegistry == address(0)) revert ZeroAddress();
        if (_depositFeeBps > MAX_FEE_BPS) revert ExcessiveFee();

        STABLE = IERC20(_stablecoin);
        scoreRegistry = IScoreRegistry(_scoreRegistry);
        rewardVault = IRewardVault(_rewardVault);
        treasury = _treasury;
        depositFeeBps = _depositFeeBps;
    }

    /**
     * @notice Deposit stablecoin into the savings pool
     * @param amount Amount to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        if (amount == 0) revert InsufficientAmount();

        address user = msg.sender;
        uint40 today = uint40(block.timestamp / 1 days);

        // Transfer tokens from user
        STABLE.safeTransferFrom(user, address(this), amount);

        // Calculate fee and net amount
        uint256 fee = 0;
        if (depositFeeBps > 0 && treasury != address(0)) {
            fee = (amount * depositFeeBps) / 10000;
            if (fee > 0) {
                STABLE.safeTransfer(treasury, fee);
            }
        }

        uint256 netAmount = amount - fee;

        // Update balances
        balances[user] += netAmount;
        totalDeposits += netAmount;

        // Record deposit day (only once per day per user)
        bool isNewDay = _recordDepositDay(user, today);

        // Update score if it's a new deposit day
        uint16 newScore = 0;
        uint16 streakDays = 0;
        uint8 freq30 = 0;

        if (isNewDay) {
            (newScore, streakDays, freq30) = scoreRegistry.updateScore(user, _depositDays[user]);
            lastScoredDay[user] = today;

            // Award points if reward vault is set
            if (address(rewardVault) != address(0)) {
                try rewardVault.onDepositDay(user, streakDays) {
                    // Points awarded successfully
                } catch {
                    // Continue even if reward fails
                }
            }

            emit ScoreUpdated(user, newScore, streakDays, freq30);
        }

        emit Deposited(user, amount, netAmount, today);
    }

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
    ) external nonReentrant whenNotPaused {
        if (amount == 0) revert InsufficientAmount();

        // Try to call permit - will revert if not supported
        try IERC20Permit(address(STABLE)).permit(
            msg.sender,
            address(this),
            amount,
            deadline,
            v,
            r,
            s
        ) {
            // Permit successful, proceed with deposit
            _executeDeposit(msg.sender, amount);
        } catch {
            revert NoPermitSupport();
        }
    }

    /**
     * @notice Internal function to execute deposit logic
     * @param user User address
     * @param amount Amount to deposit
     */
    function _executeDeposit(address user, uint256 amount) private {
        uint40 today = uint40(block.timestamp / 1 days);

        // Transfer tokens from user
        STABLE.safeTransferFrom(user, address(this), amount);

        // Calculate fee and net amount
        uint256 fee = 0;
        if (depositFeeBps > 0 && treasury != address(0)) {
            fee = (amount * depositFeeBps) / 10000;
            if (fee > 0) {
                STABLE.safeTransfer(treasury, fee);
            }
        }

        uint256 netAmount = amount - fee;

        // Update balances
        balances[user] += netAmount;
        totalDeposits += netAmount;

        // Record deposit day (only once per day per user)
        bool isNewDay = _recordDepositDay(user, today);

        // Update score if it's a new deposit day
        if (isNewDay) {
            (uint16 newScore, uint16 streakDays, uint8 freq30) = 
                scoreRegistry.updateScore(user, _depositDays[user]);
            lastScoredDay[user] = today;

            // Award points if reward vault is set
            if (address(rewardVault) != address(0)) {
                try rewardVault.onDepositDay(user, streakDays) {
                    // Points awarded successfully
                } catch {
                    // Continue even if reward fails
                }
            }

            emit ScoreUpdated(user, newScore, streakDays, freq30);
        }

        emit Deposited(user, amount, netAmount, today);
    }

    /**
     * @notice Withdraw stablecoin from the savings pool
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        if (amount == 0) revert InsufficientAmount();
        if (balances[msg.sender] < amount) revert InsufficientBalance();

        address user = msg.sender;

        // Update balances
        unchecked {
            balances[user] -= amount;
            totalDeposits -= amount;
        }

        // Transfer tokens to user
        STABLE.safeTransfer(user, amount);

        emit Withdrawn(user, amount);
    }

    /**
     * @notice Record deposit day for user (prevents duplicates)
     * @param user User address
     * @param dayIndex Day index to record
     * @return isNewDay True if this is a new deposit day
     */
    function _recordDepositDay(address user, uint40 dayIndex) private returns (bool isNewDay) {
        uint40[] storage userDays = _depositDays[user];
        
        // Check if day already recorded (assume sorted array)
        if (userDays.length > 0 && userDays[userDays.length - 1] == dayIndex) {
            return false; // Same day, not new
        }

        // Add new day
        userDays.push(dayIndex);
        return true;
    }

    /**
     * @notice Get user's deposit days (view function)
     * @param user User address
     * @return Array of deposit day indices
     */
    function getUserDepositDays(address user) external view returns (uint40[] memory) {
        return _depositDays[user];
    }

    /**
     * @notice Get user's deposit count
     * @param user User address
     * @return Number of unique deposit days
     */
    function getUserDepositCount(address user) external view returns (uint256) {
        return _depositDays[user].length;
    }

    /**
     * @notice Set deposit fee (only owner)
     * @param _depositFeeBps Fee in basis points (0-100)
     */
    function setFeeBps(uint16 _depositFeeBps) external onlyOwner {
        if (_depositFeeBps > MAX_FEE_BPS) revert ExcessiveFee();
        depositFeeBps = _depositFeeBps;
        emit FeeUpdated(_depositFeeBps);
    }

    /**
     * @notice Set treasury address (only owner)
     * @param _treasury New treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    /**
     * @notice Pause the contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Emergency withdraw for owner (only when paused)
     * @param token Token to withdraw
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner whenPaused {
        IERC20(token).safeTransfer(owner(), amount);
    }
}
