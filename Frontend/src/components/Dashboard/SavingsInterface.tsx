import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Coins, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useMicroSave } from '../../hooks/useMicroSave';
import { useWeb3 } from '../../hooks/useWeb3';
import { NETWORK_CONFIG } from '../../config/contracts';

const SavingsInterface: React.FC = () => {
  const { isConnected } = useWeb3();
  const { userStats, txState, deposit, withdraw, withdrawAll, getTestTokens, clearTxState } = useMicroSave();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    
    try {
      await deposit(depositAmount);
      setDepositAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    try {
      await withdraw(withdrawAmount);
      setWithdrawAmount('');
    } catch (error) {
      console.error('Withdraw failed:', error);
    }
  };

  const handleWithdrawAll = async () => {
    try {
      await withdrawAll();
    } catch (error) {
      console.error('Withdraw all failed:', error);
    }
  };

  const handleGetTestTokens = async () => {
    try {
      await getTestTokens('1000');
    } catch (error) {
      console.error('Faucet failed:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-2xl p-6">
        <div className="text-center py-8">
          <PiggyBank size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600">Connect your wallet to start saving with MicroSave</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <PiggyBank size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Savings Pool</h2>
          <p className="text-sm text-gray-600">Deposit and earn rewards</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank size={16} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Pool Balance</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{parseFloat(userStats.balance).toFixed(2)} USDC</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins size={16} className="text-green-600" />
            <span className="text-xs font-medium text-green-600">Wallet Balance</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{parseFloat(userStats.tokenBalance).toFixed(2)} USDC</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-purple-600" />
            <span className="text-xs font-medium text-purple-600">SCS Score</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{userStats.score}/100</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-orange-600">Streak</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{userStats.streak} days</p>
        </div>
      </div>

      {/* Transaction Status */}
      {txState.hash && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">Transaction Successful</span>
            <a
              href={`${NETWORK_CONFIG.explorerUrl}/tx/${txState.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-green-600 hover:text-green-800"
            >
              <ExternalLink size={14} />
            </a>
          </div>
          <button
            onClick={clearTxState}
            className="mt-2 text-xs text-green-600 hover:text-green-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {txState.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-800">Transaction Failed</span>
          </div>
          <p className="text-xs text-red-600 mt-1">{txState.error}</p>
          <button
            onClick={clearTxState}
            className="mt-2 text-xs text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-4">
        {/* Get Test Tokens */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Get Test Tokens</h3>
          <p className="text-sm text-gray-600 mb-3">Get USDC test tokens from the faucet</p>
          <button
            onClick={handleGetTestTokens}
            disabled={txState.isLoading}
            className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors"
          >
            {txState.isLoading ? 'Processing...' : 'Get 1000 Test USDC'}
          </button>
        </div>

        {/* Deposit */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Deposit</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Amount to deposit"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleDeposit}
              disabled={!depositAmount || txState.isLoading || parseFloat(depositAmount) <= 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              {txState.isLoading ? 'Processing...' : 'Deposit'}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Available: {parseFloat(userStats.tokenBalance).toFixed(2)} USDC
          </p>
        </div>

        {/* Withdraw */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Withdraw</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount to withdraw"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || txState.isLoading || parseFloat(withdrawAmount) <= 0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
            >
              {txState.isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
          <button
            onClick={handleWithdrawAll}
            disabled={txState.isLoading || parseFloat(userStats.balance) <= 0}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-2 rounded-lg font-medium transition-colors text-sm"
          >
            {txState.isLoading ? 'Processing...' : 'Withdraw All'}
          </button>
          <p className="text-xs text-gray-600 mt-2">
            Pool Balance: {parseFloat(userStats.balance).toFixed(2)} USDC
          </p>
        </div>
      </div>

      {/* Reward Points */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Reward Points</h3>
        <p className="text-2xl font-bold text-purple-600">{userStats.points}</p>
        <p className="text-xs text-gray-600">Earn points for consistent saving</p>
      </div>
    </div>
  );
};

export default SavingsInterface;
