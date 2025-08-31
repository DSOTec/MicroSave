import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Brain, RefreshCw } from 'lucide-react';
import { contractService } from '../services/contractService';
import type { UserSavingsData } from '../services/contractService';
import ChatBot from '../components/AI/ChatBot';
import NudgePanel from '../components/AI/NudgePanel';
import GoalTracker from '../components/AI/GoalTracker';
import AITestPanel from '../components/AI/AITestPanel';
import NavbarDashboard from '../components/Dashboard/NavbarDashboard';

const AIDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserSavingsData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>('0');

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    setIsLoading(true);
    try {
      const initialized = await contractService.initialize();
      if (initialized) {
        const address = await contractService.getCurrentUserAddress();
        if (address) {
          setUserAddress(address);
          setIsConnected(true);
          await loadUserData(address);
        }
      }
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async (address: string) => {
    try {
      const [savingsData, balance] = await Promise.all([
        contractService.getUserSavingsData(address),
        contractService.getTokenBalance(address)
      ]);
      
      setUserData(savingsData);
      setTokenBalance(balance);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleConnectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        await initializeWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet');
    }
  };

  const handleRefresh = async () => {
    if (userAddress) {
      setIsLoading(true);
      await loadUserData(userAddress);
      setIsLoading(false);
    }
  };

  const handleMintTokens = async () => {
    try {
      setIsLoading(true);
      const success = await contractService.mintTokens('1000');
      if (success && userAddress) {
        await loadUserData(userAddress);
        alert('Successfully minted 1000 test tokens!');
      }
    } catch (error) {
      console.error('Failed to mint tokens:', error);
      alert('Failed to mint tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async (amount: string) => {
    try {
      setIsLoading(true);
      const success = await contractService.deposit(amount);
      if (success && userAddress) {
        await loadUserData(userAddress);
        alert(`Successfully deposited $${amount}!`);
      }
    } catch (error) {
      console.error('Failed to deposit:', error);
      alert('Failed to deposit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDashboard />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="text-purple-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">AI-Powered Savings Dashboard</h1>
                <p className="text-gray-600">Smart insights for your financial journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isConnected && (
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              )}
              
              {!isConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                >
                  <Wallet size={20} />
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                  Connected: {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
                </div>
              )}
            </div>
          </div>
        </div>

        {!isConnected ? (
          /* Wallet Connection State */
          <div className="text-center py-16">
            <Wallet size={64} className="mx-auto mb-6 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Connect your Web3 wallet to access AI-powered savings insights, personalized nudges, and goal tracking features.
            </p>
            <button
              onClick={handleConnectWallet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : (
          /* Main Dashboard */
          <div className="space-y-8">
            {/* AI Test Panel for Interactive Demo */}
            <AITestPanel />
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Savings Balance</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${userData ? parseFloat(userData.balance).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <TrendingUp className="text-green-500" size={24} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Consistency Score</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {userData?.score || 0}/100
                    </p>
                  </div>
                  <div className="text-blue-500">📊</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {userData?.streak || 0} days
                    </p>
                  </div>
                  <div className="text-orange-500">🔥</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reward Points</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {userData?.points || 0}
                    </p>
                  </div>
                  <div className="text-purple-500">⭐</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleMintTokens}
                  disabled={isLoading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Get Test Tokens (1000)
                </button>
                
                <button
                  onClick={() => handleDeposit('10')}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Quick Deposit ($10)
                </button>
                
                <button
                  onClick={() => handleDeposit('50')}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Quick Deposit ($50)
                </button>

                <div className="text-sm text-gray-600 flex items-center">
                  Wallet Balance: ${parseFloat(tokenBalance).toFixed(2)} USDC
                </div>
              </div>
            </div>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Nudges and Insights */}
              <NudgePanel userData={userData} />

              {/* Goal Tracking */}
              <GoalTracker userData={userData} />
            </div>

            {/* AI Insights Summary */}
            {userData && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Brain className="text-purple-600" size={20} />
                  <span>AI Performance Analysis</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {userData.score >= 80 ? '🌟' : userData.score >= 60 ? '📈' : '💪'}
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userData.score >= 80 ? 'Excellent Saver!' : 
                       userData.score >= 60 ? 'Good Progress' : 'Building Habits'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Your consistency is {userData.score >= 70 ? 'outstanding' : 'improving'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {userData.streak >= 14 ? '🔥' : userData.streak >= 7 ? '⚡' : '🌱'}
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userData.streak >= 14 ? 'Streak Master' : 
                       userData.streak >= 7 ? 'Building Momentum' : 'Getting Started'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userData.streak > 0 ? `${userData.streak} day streak` : 'Start your streak today!'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {userData.frequency >= 20 ? '🎯' : userData.frequency >= 10 ? '📊' : '🚀'}
                    </div>
                    <p className="font-semibold text-gray-800">
                      {userData.frequency >= 20 ? 'Highly Active' : 
                       userData.frequency >= 10 ? 'Regular Saver' : 'Room to Grow'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userData.frequency} deposit days this month
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Chatbot */}
        <ChatBot userData={userData} />
      </div>
    </div>
  );
};

export default AIDashboard;
