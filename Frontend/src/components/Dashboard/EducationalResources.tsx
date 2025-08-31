import React from 'react';
import { GraduationCap, TrendingUp, Shield, Play, ArrowRight } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  readTime: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  readTime 
}) => (
  <div className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
    <div className={`${bgColor} rounded-lg p-6 mb-4 flex items-center justify-center`}>
      <div className="text-white [&>svg]:w-8 [&>svg]:h-8">
        {icon}
      </div>
    </div>
    
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>
    
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{readTime}</span>
      <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
    </div>
  </div>
);

const EducationalResources: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Educational Resources</h1>
              <p className="text-gray-600 text-sm">Learn more about DeFi and improve your financial knowledge</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              View All Articles
            </button>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResourceCard
              title="Understanding DeFi Basics"
              description="Learn the fundamentals of decentralized finance and how it can benefit your savings strategy."
              icon={<GraduationCap />}
              bgColor="bg-green-500"
              readTime="5 min read"
            />
            
            <ResourceCard
              title="Yield Farming Strategies"
              description="Discover advanced techniques to maximize your returns through strategic yield farming."
              icon={<TrendingUp />}
              bgColor="bg-blue-500"
              readTime="8 min read"
            />
            
            <ResourceCard
              title="Protecting Your Assets"
              description="Essential security practices to keep your digital assets safe in the DeFi ecosystem."
              icon={<Shield />}
              bgColor="bg-purple-500"
              readTime="6 min read"
            />
          </div>

          {/* Video Tutorial Section */}
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Play size={20} className="text-white ml-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Video Tutorial Series</h3>
                  <p className="text-slate-300 text-sm">Master MicroSave with our comprehensive video guides</p>
                </div>
              </div>
              
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Play size={16} />
                Watch Now
              </button>
            </div>
          </div>

          {/* Additional Learning Resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Start Guide</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Set up your first savings goal
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Connect your DeFi wallet
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Start earning yield rewards
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Popular Topics</h4>
              <div className="space-y-2">
                <button className="w-full text-left bg-white hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors">
                  What is Liquidity Mining?
                </button>
                <button className="w-full text-left bg-white hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors">
                  Smart Contract Risks
                </button>
                <button className="w-full text-left bg-white hover:bg-gray-100 p-3 rounded-lg text-sm transition-colors">
                  Gas Fee Optimization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;