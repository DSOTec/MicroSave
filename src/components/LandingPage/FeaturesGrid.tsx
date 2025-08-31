import React from 'react';
import { Bot, TrendingUp, Trophy, Users } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const FeaturesGrid: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Assistant",
      description: "Personalized savings recommendations and behavioral nudges",
      iconBg: "bg-blue-600",
      iconColor: "text-white"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Credit Scoring",
      description: "Build on-chain credit history through consistent saving habits",
      iconBg: "bg-green-600",
      iconColor: "text-white"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Rewards System",
      description: "Earn tokens and unlock benefits for consistent saving",
      iconBg: "bg-yellow-600",
      iconColor: "text-white"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Savings",
      description: "Join savings groups and compete with friends",
      iconBg: "bg-purple-600",
      iconColor: "text-white"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid of Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-750 transition-colors duration-300 text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 ${feature.iconBg} rounded-xl flex items-center justify-center ${feature.iconColor}`}>
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;