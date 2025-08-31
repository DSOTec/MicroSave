import React from 'react';
import { Lightbulb, TrendingUp, Star } from 'lucide-react';

interface CircularProgressProps {
  value: number;
  max: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  value, 
  max, 
  color, 
  size = 80, 
  strokeWidth = 8 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-xs text-gray-500">/{max}</span>
      </div>
    </div>
  );
};

const AIAssistantDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Assistant Card */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AI Assistant</h2>
                <p className="text-sm text-gray-600">Personalized savings insights</p>
              </div>
            </div>

            {/* Smart Savings Tip */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                  <Lightbulb size={14} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Savings Tip</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Based on your spending patterns, you could save an extra $150/month 
                    by setting up automatic deposits every Friday. This aligns with your 
                    salary schedule and could help you reach your emergency fund goal 2 
                    months earlier!
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600">Savings Streak</span>
                </div>
                <span className="font-bold text-gray-900">28 days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm text-gray-600">Credit Score</span>
                </div>
                <span className="font-bold text-gray-900">785</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h2>

            {/* Circular Progress Indicators */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <CircularProgress value={87} max={100} color="#10b981" />
                <p className="text-sm text-gray-600 mt-2">Consistency Score</p>
              </div>
              
              <div className="text-center">
                <CircularProgress value={68} max={100} color="#84cc16" />
                <p className="text-sm text-gray-600 mt-2">Growth Rate</p>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Average</span>
                <span className="font-bold text-gray-900">$1,247</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Best Month</span>
                <span className="font-bold text-green-600">$2,100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Goal Completion</span>
                <span className="font-bold text-gray-900">67%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time to Emergency Fund</span>
                <span className="font-bold text-blue-600">4 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantDashboard;