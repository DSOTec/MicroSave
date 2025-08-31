import { ethers } from 'ethers';
import { NETWORK_CONFIG } from './contracts';

// Web3 Provider Configuration
export class Web3Provider {
  private static instance: Web3Provider;
  private provider: ethers.BrowserProvider | ethers.JsonRpcProvider | null = null;
  private signer: ethers.Signer | null = null;

  private constructor() {}

  static getInstance(): Web3Provider {
    if (!Web3Provider.instance) {
      Web3Provider.instance = new Web3Provider();
    }
    return Web3Provider.instance;
  }

  // Initialize provider (MetaMask or fallback RPC)
  async initializeProvider(): Promise<ethers.BrowserProvider | ethers.JsonRpcProvider> {
    if (this.provider) return this.provider;

    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      return this.provider;
    } else {
      // Fallback to RPC provider for read-only operations
      this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
      return this.provider;
    }
  }

  // Get signer for write operations
  async getSigner(): Promise<ethers.Signer> {
    if (this.signer) return this.signer;

    const provider = await this.initializeProvider();
    if (provider instanceof ethers.BrowserProvider) {
      this.signer = await provider.getSigner();
      return this.signer;
    } else {
      throw new Error('No wallet connected. Please connect MetaMask or another wallet.');
    }
  }

  // Get provider for read operations
  async getProvider(): Promise<ethers.BrowserProvider | ethers.JsonRpcProvider> {
    return await this.initializeProvider();
  }

  // Connect wallet
  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not found. Please install MetaMask.');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Switch to Lisk Sepolia if needed
      await this.switchToLiskSepolia();
      
      const signer = await this.getSigner();
      const address = await signer.getAddress();
      
      return address;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  // Switch to Lisk Sepolia network
  async switchToLiskSepolia(): Promise<void> {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // Network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}`,
                chainName: NETWORK_CONFIG.name,
                rpcUrls: [NETWORK_CONFIG.rpcUrl],
                blockExplorerUrls: [NETWORK_CONFIG.explorerUrl],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  }

  // Get current account
  async getCurrentAccount(): Promise<string | null> {
    if (!window.ethereum) return null;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Failed to get current account:', error);
      return null;
    }
  }

  // Check if connected to correct network
  async isConnectedToLiskSepolia(): Promise<boolean> {
    if (!window.ethereum) return false;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return parseInt(chainId, 16) === NETWORK_CONFIG.chainId;
    } catch (error) {
      console.error('Failed to check network:', error);
      return false;
    }
  }

  // Reset provider and signer (for logout)
  reset(): void {
    this.provider = null;
    this.signer = null;
  }
}

// Global Web3 instance
export const web3Provider = Web3Provider.getInstance();

// Utility functions
export const formatEther = (value: bigint | string): string => {
  return ethers.formatUnits(value, 18);
};

export const parseEther = (value: string): bigint => {
  return ethers.parseUnits(value, 18);
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
