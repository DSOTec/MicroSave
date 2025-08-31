import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { web3Provider } from '../config/web3';
import { getContractConfig, CONTRACT_ADDRESSES } from '../config/contracts';

// Contract hook for interacting with smart contracts
export const useContract = (contractName: keyof typeof CONTRACT_ADDRESSES) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeContract = useCallback(async (withSigner = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const { address, abi } = getContractConfig(contractName);
      
      if (withSigner) {
        const signer = await web3Provider.getSigner();
        const contractInstance = new ethers.Contract(address, abi, signer);
        setContract(contractInstance);
      } else {
        const provider = await web3Provider.getProvider();
        const contractInstance = new ethers.Contract(address, abi, provider);
        setContract(contractInstance);
      }
    } catch (err) {
      console.error(`Failed to initialize ${contractName} contract:`, err);
      setError(err instanceof Error ? err.message : 'Failed to initialize contract');
    } finally {
      setIsLoading(false);
    }
  }, [contractName]);

  useEffect(() => {
    initializeContract();
  }, [initializeContract]);

  const getContractWithSigner = useCallback(async () => {
    await initializeContract(true);
  }, [initializeContract]);

  return {
    contract,
    isLoading,
    error,
    getContractWithSigner,
    reinitialize: initializeContract,
  };
};

// Specific hooks for each contract
export const useSavingsPool = () => {
  return useContract('SavingsPool');
};

export const useScoreRegistry = () => {
  return useContract('ScoreRegistry');
};

export const useRewardVault = () => {
  return useContract('RewardVault');
};

export const useMockERC20 = () => {
  return useContract('MockERC20');
};
