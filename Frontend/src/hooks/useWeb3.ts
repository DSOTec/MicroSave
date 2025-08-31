import { useState, useEffect, useCallback } from 'react';
import { web3Provider } from '../config/web3';

interface Web3State {
  isConnected: boolean;
  account: string | null;
  isCorrectNetwork: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useWeb3 = () => {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    account: null,
    isCorrectNetwork: false,
    isLoading: true,
    error: null,
  });

  // Check connection status
  const checkConnection = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const account = await web3Provider.getCurrentAccount();
      const isCorrectNetwork = await web3Provider.isConnectedToLiskSepolia();
      
      setState({
        isConnected: !!account,
        account,
        isCorrectNetwork,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to check connection:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const account = await web3Provider.connectWallet();
      const isCorrectNetwork = await web3Provider.isConnectedToLiskSepolia();
      
      setState({
        isConnected: true,
        account,
        isCorrectNetwork,
        isLoading: false,
        error: null,
      });
      
      return account;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
      throw error;
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    web3Provider.reset();
    setState({
      isConnected: false,
      account: null,
      isCorrectNetwork: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Switch to Lisk Sepolia
  const switchNetwork = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await web3Provider.switchToLiskSepolia();
      await checkConnection();
    } catch (error) {
      console.error('Failed to switch network:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to switch network',
      }));
      throw error;
    }
  }, [checkConnection]);

  // Listen for account and network changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        checkConnection();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Initial check
      checkConnection();

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [checkConnection, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    checkConnection,
  };
};
