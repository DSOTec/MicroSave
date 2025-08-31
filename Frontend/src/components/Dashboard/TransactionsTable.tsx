import React from 'react';
import { ExternalLink, Plus, Minus, TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'Deposit' | 'Interest' | 'Withdraw';
  amount: number;
  asset: string;
  date: string;
  status: 'Completed';
}

interface TransactionsTableProps {}

const TransactionsTable: React.FC<TransactionsTableProps> = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'Deposit',
      amount: 500.00,
      asset: 'USDC',
      date: 'Jan 15, 2025',
      status: 'Completed'
    },
    {
      id: '2',
      type: 'Interest',
      amount: 12.47,
      asset: 'USDC',
      date: 'Jan 14, 2025',
      status: 'Completed'
    },
    {
      id: '3',
      type: 'Deposit',
      amount: 250.00,
      asset: 'USDT',
      date: 'Jan 12, 2025',
      status: 'Completed'
    },
    {
      id: '4',
      type: 'Withdraw',
      amount: -100.00,
      asset: 'DAI',
      date: 'Jan 10, 2025',
      status: 'Completed'
    },
    {
      id: '5',
      type: 'Deposit',
      amount: 750.00,
      asset: 'USDC',
      date: 'Jan 8, 2025',
      status: 'Completed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'Interest':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'Withdraw':
        return <Minus className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const sign = isNegative ? '-' : '+';
    return `${sign}$${absAmount.toFixed(2)}`;
  };

  const getAmountColor = (amount: number, type: string) => {
    if (type === 'Withdraw') return 'text-red-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Transactions
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              View All
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Asset
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(transaction.type)}
                        <span className="text-sm font-medium text-slate-900">
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${getAmountColor(transaction.amount, transaction.type)}`}>
                        {formatAmount(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700 font-medium">
                        {transaction.asset}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {transaction.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;