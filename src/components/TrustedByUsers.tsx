import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react';

interface Statistic {
  id: string;
  value: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface GlobalMetric {
  id: string;
  value: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

const TrustedByUsers: React.FC = () => {
  const mainStats: Statistic[] = [
    {
      id: 'users',
      value: '25,000+',
      label: 'Active Users',
      subtitle: 'Growing daily',
      icon: <Users className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 'saved',
      value: '$12.5M',
      label: 'Total Saved',
      subtitle: 'And counting...',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'apy',
      value: '7.2%',
      label: 'Average APY',
      subtitle: 'Current rate',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      id: 'success',
      value: '89%',
      label: 'Success Rate',
      subtitle: 'Reach their goals',
      icon: <Target className="w-8 h-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  const globalMetrics: GlobalMetric[] = [
    {
      id: 'countries',
      value: '120+',
      label: 'Countries',
      subtitle: 'Global Reach',
      icon: <Globe className="w-8 h-8 text-gray-400" />
    },
    {
      id: 'average',
      value: '$485',
      label: 'Average',
      subtitle: 'Monthly Savings',
      icon: <Smartphone className="w-8 h-8 text-gray-400" />
    },
    {
      id: 'streak',
      value: '73 Days',
      label: 'Average Streak',
      subtitle: 'Average Streak',
      icon: <Zap className="w-8 h-8 text-gray-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Trusted by Savers Worldwide</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of users who have already transformed their financial habits with MicroSave.
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {mainStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-gray-600 transition-all duration-300 hover:scale-105"
            >
              <div className={`${stat.bgColor} ${stat.color} p-4 rounded-xl w-fit mx-auto mb-6`}>
                {stat.icon}
              </div>
              
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              
              <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
              <p className="text-gray-400 text-sm">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Global Impact Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Global Impact</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            MicroSave is helping people build better financial habits across the globe.
          </p>
        </div>

        {/* Global Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {globalMetrics.map((metric) => (
            <div
              key={metric.id}
              className="text-center group"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                
                <div className="text-3xl font-bold mb-2 text-white">
                  {metric.value}
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{metric.label}</h3>
                <p className="text-gray-400 text-sm">{metric.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Community Testimonial */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-gray-700 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">💫</div>
            <h3 className="text-2xl font-bold mb-4">Join the Financial Revolution</h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              "MicroSave helped me save my first $10,000. The community support and AI guidance made it possible when I thought it never would be."
            </p>
            <div className="text-sm text-gray-500">
              - Jessica Chen, Marketing Manager
            </div>
          </div>
          
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Start Your Journey
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">4.9★</div>
            <div className="text-sm text-gray-400">App Store Rating</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-purple-400 mb-2">256-bit</div>
            <div className="text-sm text-gray-400">Encryption</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByUsers;