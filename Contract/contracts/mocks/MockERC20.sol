// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockERC20
 * @notice Mock ERC20 token with permit functionality for testing MicroSave
 * @dev Includes mint function for easy test setup
 */
contract MockERC20 is ERC20, ERC20Permit, Ownable {
    uint8 private _decimals;

    /**
     * @notice Constructor
     * @param name Token name
     * @param symbol Token symbol
     * @param decimals_ Token decimals
     * @param owner Token owner
     */
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        address owner
    ) ERC20(name, symbol) ERC20Permit(name) Ownable(owner) {
        _decimals = decimals_;
    }

    /**
     * @notice Override decimals function
     * @return Number of decimals
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Mint tokens to an address
     * @param to Address to mint to
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Mint tokens to multiple addresses
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

    /**
     * @notice Burn tokens from an address (for testing)
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    /**
     * @notice Faucet function for easy testing (anyone can call)
     * @param amount Amount to mint to caller
     */
    function faucet(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
