import React from 'react';
import { Play, TrendingUp, Bot } from 'lucide-react';

interface HeroSectionProps {
  onStartSaving?: () => void;
  onWatchDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartSaving, onWatchDemo }) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-green-500/30 rounded-full px-4 py-2">
              <Bot className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">AI-Powered DeFi Savings</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Build{' '}
              <span className="text-green-400">Consistent</span>
              <br />
              Savings Habits with
              <br />
              AI
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              MicroSave combines decentralized finance with behavioral AI to 
              help you save stablecoins regularly, improve financial discipline, 
              and unlock future financial opportunities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartSaving}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Start Saving Now
              </button>
              <button
                onClick={onWatchDemo}
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div>
                <div className="text-3xl font-bold text-green-400">$2.5M+</div>
                <div className="text-gray-400 text-sm">Total Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">15K+</div>
                <div className="text-gray-400 text-sm">Active Savers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">98%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:pl-8">
            <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Your Savings Dashboard</h3>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Total Savings Card */}
              <div className="bg-slate-700 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-2">Total Savings</div>
                <div className="text-4xl font-bold mb-2">$1,247.83</div>
                <div className="text-green-400 text-sm">+12.5% this month</div>
              </div>

              {/* Goals Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-2">Weekly Goal</div>
                  <div className="text-2xl font-bold mb-2">$25.00</div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-2">Streak</div>
                  <div className="text-2xl font-bold mb-2">47 days</div>
                  <div className="text-green-400 text-sm">On fire!</div>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">AI Suggestion</div>
                    <div className="text-gray-300 text-sm">
                      Save $5 more today to hit your weekly goal!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;