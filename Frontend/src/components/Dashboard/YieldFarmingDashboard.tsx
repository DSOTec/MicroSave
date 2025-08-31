import React from 'react';

interface ProtocolCardProps {
  name: string;
  type: string;
  apy: string;
  deposited: string;
  earned: string;
  bgColor: string;
  textColor: string;
  iconBg: string;
  iconText: string;
  status: string;
  statusColor: string;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  name,
  type,
  apy,
  deposited,
  earned,
  bgColor,
  textColor,
  iconBg,
  iconText,
  status,
  statusColor
}) => (
  <div className={`${bgColor} rounded-xl p-6 flex-1 min-w-0`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
        {iconText}
      </div>
      <div>
        <h3 className={`font-semibold ${textColor}`}>{name}</h3>
        <p className="text-gray-500 text-xs">{type}</p>
      </div>
      <div className="ml-auto">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
    
    <div className="space-y-3">
      <div>
        <p className="text-xs text-gray-500 mb-1">APY</p>
        <p className={`text-lg font-bold ${textColor}`}>{apy}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Deposited</p>
        <p className={`text-sm font-semibold ${textColor}`}>{deposited}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Earned</p>
        <p className={`text-sm font-semibold ${textColor}`}>{earned}</p>
      </div>
    </div>
  </div>
);

const YieldFarmingDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Yield Farming & Rewards</h1>
              <p className="text-gray-600 text-sm">Earn additional rewards through DeFi protocols</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Optimize Yields
            </button>
          </div>
        </div>

        {/* Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ProtocolCard
            name="Compound"
            type="USDC Pool"
            apy="4.85%"
            deposited="$5,800"
            earned="$47.92"
            bgColor="bg-green-50"
            textColor="text-green-800"
            iconBg="bg-green-500"
            iconText="C"
            status="Active"
            statusColor="bg-green-100 text-green-700"
          />
          
          <ProtocolCard
            name="Aave"
            type="USDT Pool"
            apy="4.12%"
            deposited="$4,200"
            earned="$28.15"
            bgColor="bg-blue-50"
            textColor="text-blue-800"
            iconBg="bg-blue-500"
            iconText="A"
            status="Active"
            statusColor="bg-blue-100 text-blue-700"
          />
          
          <ProtocolCard
            name="Curve"
            type=""
            apy="6.24%"
            deposited="$100"
            earned="Medium"
            bgColor="bg-purple-50"
            textColor="text-purple-800"
            iconBg="bg-purple-500"
            iconText="C"
            status="Warning"
            statusColor="bg-yellow-100 text-yellow-700"
          />
        </div>

        {/* Total Rewards */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Total Rewards Earned</p>
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-bold">$186.47</h2>
                <span className="text-green-100 text-sm">This month: +$76.07</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-right">
                <p className="text-green-100 text-xs">7 day APY</p>
                <p className="text-xl font-bold">4.62%</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/20">
                Claim Rewards
              </button>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Total Deposited</p>
            <p className="text-xl font-bold text-gray-900">$10,100</p>
            <p className="text-green-600 text-xs">+2.4% this week</p>
          </div>
          
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Active Positions</p>
            <p className="text-xl font-bold text-gray-900">3</p>
            <p className="text-blue-600 text-xs">Across 3 protocols</p>
          </div>
          
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Average APY</p>
            <p className="text-xl font-bold text-gray-900">5.07%</p>
            <p className="text-purple-600 text-xs">Weighted average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldFarmingDashboard;
