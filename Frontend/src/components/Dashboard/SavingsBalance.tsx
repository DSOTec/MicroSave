import React, { useState } from 'react';

interface SavingsBalanceProps {
  balance?: number;
  apy?: number;
  monthlyGrowth?: number;
}

const SavingsBalance: React.FC<SavingsBalanceProps> = ({
  balance = 12847.92,
  apy = 4.85,
  monthlyGrowth = 8.2
}) => {
  const [currentBalance, setCurrentBalance] = useState(balance);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleDeposit = () => {
    // Placeholder for deposit functionality
    console.log('Deposit clicked');
  };

  const handleWithdraw = () => {
    // Placeholder for withdraw functionality
    console.log('Withdraw clicked');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-slate-600 text-lg font-medium mb-2">
              Total Savings Balance
            </h2>
            <div className="text-4xl font-bold text-slate-900 mb-3">
              {formatCurrency(currentBalance)}
            </div>
            <div className="flex items-center text-emerald-500 font-medium">
              <svg 
                className="w-4 h-4 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 11l5-5m0 0l5 5m-5-5v12" 
                />
              </svg>
              +{monthlyGrowth}% this month
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-500 text-sm font-medium mb-1">APY</div>
            <div className="text-2xl font-bold text-emerald-500">
              {apy}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDeposit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Deposit
          </button>
          
          <button
            onClick={handleWithdraw}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 12H4" 
              />
            </svg>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsBalance;