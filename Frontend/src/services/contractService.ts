import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, getContractConfig } from '../config/contracts';

export interface UserSavingsData {
  balance: string;
  score: number;
  streak: number;
  frequency: number;
  points: number;
  depositDays: number[];
  lastDepositDay: number | null;
  totalDeposits: string;
}


export class ContractService {
  private provider: ethers.Provider | null = null;
  private signer: ethers.Signer | null = null;
  private contracts: { [key: string]: ethers.Contract } = {};

  async initialize() {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
        this.signer = await (this.provider as any).getSigner();
        
        // Initialize contracts
        const contractNames = ['SavingsPool', 'ScoreRegistry', 'RewardVault', 'MockERC20'] as const;
        
        for (const name of contractNames) {
          const { address, abi } = getContractConfig(name);
          this.contracts[name] = new ethers.Contract(address, abi, this.signer);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize contract service:', error);
      return false;
    }
  }

  async getUserSavingsData(userAddress: string): Promise<UserSavingsData | null> {
    try {
      if (!this.contracts.SavingsPool || !this.contracts.ScoreRegistry || !this.contracts.RewardVault) {
        throw new Error('Contracts not initialized');
      }

      const [
        balance,
        stats,
        points,
        depositDays,
        totalDeposits
      ] = await Promise.all([
        this.contracts.SavingsPool.balances(userAddress),
        this.contracts.ScoreRegistry.getUserStats(userAddress),
        this.contracts.RewardVault.points(userAddress),
        this.contracts.SavingsPool.getUserDepositDays(userAddress),
        this.contracts.SavingsPool.totalDeposits()
      ]);

      const depositDaysNumbers = depositDays.map((day: any) => Number(day));
      const lastDepositDay = depositDaysNumbers.length > 0 
        ? Math.max(...depositDaysNumbers) 
        : null;

      return {
        balance: ethers.formatUnits(balance, 18),
        score: Number(stats.score),
        streak: Number(stats.streak),
        frequency: Number(stats.freq30),
        points: Number(points),
        depositDays: depositDaysNumbers,
        lastDepositDay,
        totalDeposits: ethers.formatUnits(totalDeposits, 18)
      };
    } catch (error) {
      console.error('Error fetching user savings data:', error);
      return null;
    }
  }

  async deposit(amount: string): Promise<boolean> {
    try {
      if (!this.contracts.SavingsPool || !this.contracts.MockERC20) {
        throw new Error('Contracts not initialized');
      }

      const amountWei = ethers.parseUnits(amount, 18);
      
      // First approve the spending
      const approveTx = await this.contracts.MockERC20.approve(
        CONTRACT_ADDRESSES.SavingsPool,
        amountWei
      );
      await approveTx.wait();

      // Then deposit
      const depositTx = await this.contracts.SavingsPool.deposit(amountWei);
      await depositTx.wait();

      return true;
    } catch (error) {
      console.error('Error making deposit:', error);
      return false;
    }
  }

  async withdraw(amount: string): Promise<boolean> {
    try {
      if (!this.contracts.SavingsPool) {
        throw new Error('SavingsPool contract not initialized');
      }

      const amountWei = ethers.parseUnits(amount, 18);
      const withdrawTx = await this.contracts.SavingsPool.withdraw(amountWei);
      await withdrawTx.wait();

      return true;
    } catch (error) {
      console.error('Error making withdrawal:', error);
      return false;
    }
  }

  async getTokenBalance(userAddress: string): Promise<string> {
    try {
      if (!this.contracts.MockERC20) {
        throw new Error('MockERC20 contract not initialized');
      }

      const balance = await this.contracts.MockERC20.balanceOf(userAddress);
      return ethers.formatUnits(balance, 18);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return '0';
    }
  }

  async mintTokens(amount: string): Promise<boolean> {
    try {
      if (!this.contracts.MockERC20) {
        throw new Error('MockERC20 contract not initialized');
      }

      const amountWei = ethers.parseUnits(amount, 18);
      const mintTx = await this.contracts.MockERC20.faucet(amountWei);
      await mintTx.wait();

      return true;
    } catch (error) {
      console.error('Error minting tokens:', error);
      return false;
    }
  }

  getCurrentUserAddress(): string | null {
    return this.signer ? this.signer.getAddress() as any : null;
  }
}

export const contractService = new ContractService();
