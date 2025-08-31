import { useState, useEffect, useCallback } from 'react';
import { useSavingsPool, useScoreRegistry, useRewardVault, useMockERC20 } from './useContract';
import { useWeb3 } from './useWeb3';
import { formatEther, parseEther } from '../config/web3';

interface UserStats {
  balance: string;
  tokenBalance: string;
  allowance: string;
  score: number;
  streak: number;
  points: string;
  totalDeposits: string;
}

interface TransactionState {
  isLoading: boolean;
  error: string | null;
  hash: string | null;
}

export const useMicroSave = () => {
  const { account, isConnected } = useWeb3();
  const { contract: savingsPool, getContractWithSigner: getSavingsPoolSigner } = useSavingsPool();
  const { contract: scoreRegistry } = useScoreRegistry();
  const { contract: rewardVault } = useRewardVault();
  const { contract: mockToken, getContractWithSigner: getTokenSigner } = useMockERC20();

  const [userStats, setUserStats] = useState<UserStats>({
    balance: '0',
    tokenBalance: '0',
    allowance: '0',
    score: 0,
    streak: 0,
    points: '0',
    totalDeposits: '0',
  });

  const [txState, setTxState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    hash: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch user statistics
  const fetchUserStats = useCallback(async () => {
    if (!account || !savingsPool || !scoreRegistry || !rewardVault || !mockToken) return;

    try {
      setIsLoading(true);

      const [
        balance,
        tokenBalance,
        allowance,
        [score, streak],
        points,
        totalDeposits,
      ] = await Promise.all([
        savingsPool.balances(account),
        mockToken.balanceOf(account),
        mockToken.allowance(account, savingsPool.target),
        scoreRegistry.getUserStats(account),
        rewardVault.points(account),
        savingsPool.totalDeposits(),
      ]);

      setUserStats({
        balance: formatEther(balance),
        tokenBalance: formatEther(tokenBalance),
        allowance: formatEther(allowance),
        score: Number(score),
        streak: Number(streak),
        points: points.toString(),
        totalDeposits: formatEther(totalDeposits),
      });
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [account, savingsPool, scoreRegistry, rewardVault, mockToken]);

  // Deposit function
  const deposit = useCallback(async (amount: string) => {
    if (!account || !savingsPool || !mockToken) throw new Error('Wallet not connected or contracts not ready');

    try {
      setTxState({ isLoading: true, error: null, hash: null });

      await getSavingsPoolSigner();
      await getTokenSigner();

      const amountWei = parseEther(amount);

      // First approve the token
      await getTokenSigner();
      const approveTx = await mockToken.approve(savingsPool.target, amountWei);
      await approveTx.wait();

      // Then make the deposit
      await getSavingsPoolSigner();
      const depositTx = await savingsPool.deposit(amountWei);
      const receipt = await depositTx.wait();

      setTxState({ isLoading: false, error: null, hash: receipt.hash });
      
      // Refresh stats after successful deposit
      await fetchUserStats();

      return receipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Deposit failed';
      setTxState({ isLoading: false, error: errorMessage, hash: null });
      throw error;
    }
  }, [account, savingsPool, mockToken, getSavingsPoolSigner, getTokenSigner, fetchUserStats]);

  // Withdraw function
  const withdraw = useCallback(async (amount: string) => {
    if (!account || !savingsPool) throw new Error('Wallet not connected or contract not ready');

    try {
      setTxState({ isLoading: true, error: null, hash: null });

      await getSavingsPoolSigner();
      const amountWei = parseEther(amount);

      const withdrawTx = await savingsPool.withdraw(amountWei);
      const receipt = await withdrawTx.wait();

      setTxState({ isLoading: false, error: null, hash: receipt.hash });
      
      // Refresh stats after successful withdrawal
      await fetchUserStats();

      return receipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Withdrawal failed';
      setTxState({ isLoading: false, error: errorMessage, hash: null });
      throw error;
    }
  }, [account, savingsPool, getSavingsPoolSigner, fetchUserStats]);

  // Withdraw all function
  const withdrawAll = useCallback(async () => {
    if (!account || !savingsPool) throw new Error('Wallet not connected or contract not ready');

    try {
      setTxState({ isLoading: true, error: null, hash: null });

      await getSavingsPoolSigner();
      const withdrawTx = await savingsPool.withdrawAll();
      const receipt = await withdrawTx.wait();

      setTxState({ isLoading: false, error: null, hash: receipt.hash });
      
      // Refresh stats after successful withdrawal
      await fetchUserStats();

      return receipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Withdrawal failed';
      setTxState({ isLoading: false, error: errorMessage, hash: null });
      throw error;
    }
  }, [account, savingsPool, getSavingsPoolSigner, fetchUserStats]);

  // Get test tokens from faucet
  const getTestTokens = useCallback(async (amount: string = '1000') => {
    if (!account || !mockToken) throw new Error('Wallet not connected or token contract not ready');

    try {
      setTxState({ isLoading: true, error: null, hash: null });

      await getTokenSigner();
      const amountWei = parseEther(amount);

      const faucetTx = await mockToken.faucet(amountWei);
      const receipt = await faucetTx.wait();

      setTxState({ isLoading: false, error: null, hash: receipt.hash });
      
      // Refresh stats after getting tokens
      await fetchUserStats();

      return receipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Faucet failed';
      setTxState({ isLoading: false, error: errorMessage, hash: null });
      throw error;
    }
  }, [account, mockToken, getTokenSigner, fetchUserStats]);

  // Clear transaction state
  const clearTxState = useCallback(() => {
    setTxState({ isLoading: false, error: null, hash: null });
  }, []);

  // Fetch stats when dependencies are ready
  useEffect(() => {
    if (isConnected && account) {
      fetchUserStats();
    }
  }, [isConnected, account, fetchUserStats]);

  return {
    userStats,
    isLoading,
    txState,
    deposit,
    withdraw,
    withdrawAll,
    getTestTokens,
    fetchUserStats,
    clearTxState,
  };
};
