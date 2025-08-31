import React from 'react';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { useWeb3 } from '../../hooks/useWeb3';
import { formatAddress } from '../../config/web3';

const WalletConnect: React.FC = () => {
  const { isConnected, account, isCorrectNetwork, isLoading, error, connect, disconnect, switchNetwork } = useWeb3();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork();
    } catch (error) {
      console.error('Network switch failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600">Connecting...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={handleConnect}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Wallet size={16} />
          Connect Wallet
        </button>
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
          <AlertCircle size={14} />
          Wrong Network
        </div>
        <button
          onClick={handleSwitchNetwork}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors text-sm"
        >
          Switch to Lisk Sepolia
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
        <CheckCircle size={14} />
        <span className="font-medium">{formatAddress(account!)}</span>
      </div>
      <button
        onClick={disconnect}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
};

export default WalletConnect;
