import React from 'react';
import { Clock, DollarSign, Percent } from 'lucide-react';

interface Benefit {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const StartSavingsJourney: React.FC = () => {
  const benefits: Benefit[] = [
    {
      id: 'time',
      value: '2 mins',
      label: 'Setup Time',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      id: 'minimum',
      value: '$10',
      label: 'Minimum Start',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      id: 'fees',
      value: '0%',
      label: 'Platform Fees',
      icon: <Percent className="w-6 h-6" />,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Section */}
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-3xl p-12 border border-gray-700 mb-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="text-green-400">Savings Journey</span> Today
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of savers who are building wealth through consistent, AI-powered saving habits. Your financial goals start with us.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105">
              Get Started
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="text-center">
                <div className={`${benefit.color} mb-3 flex justify-center`}>
                  {benefit.icon}
                </div>
                <div className={`text-2xl font-bold mb-1 ${benefit.color}`}>
                  {benefit.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {benefit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-green-400 mb-1">Bank-Level</div>
            <div className="text-xs text-gray-400">Security</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-blue-400 mb-1">FDIC</div>
            <div className="text-xs text-gray-400">Insured</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-purple-400 mb-1">256-bit</div>
            <div className="text-xs text-gray-400">Encryption</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-yellow-400 mb-1">24/7</div>
            <div className="text-xs text-gray-400">Support</div>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            No hidden fees • Cancel anytime • Start with any amount
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <span>Trusted by 25,000+ savers</span>
            <span>•</span>
            <span>$12.5M+ saved</span>
            <span>•</span>
            <span>89% success rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSavingsJourney;