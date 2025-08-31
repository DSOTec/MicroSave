import React from 'react';
import { AlertCircle, Pause, Lock } from 'lucide-react';

interface ChallengeItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  statistic: string;
  statisticLabel: string;
  iconColor: string;
  statisticColor: string;
  cardBorder: string;
}

const SavingsChallenge: React.FC = () => {
  const challenges: ChallengeItem[] = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Income Unpredictability",
      description: "Irregular income makes it difficult to maintain consistent saving patterns, leading to financial stress and uncertainty.",
      statistic: "78%",
      statisticLabel: "of people struggle with irregular income",
      iconColor: "text-red-400",
      statisticColor: "text-red-400",
      cardBorder: "border-red-500/30"
    },
    {
      icon: <Pause className="w-6 h-6" />,
      title: "Lack of Motivation",
      description: "Without proper incentives and behavioral nudges, maintaining long-term savings habits becomes challenging.",
      statistic: "65%",
      statisticLabel: "abandon savings goals within 3 months",
      iconColor: "text-yellow-400",
      statisticColor: "text-yellow-400",
      cardBorder: "border-yellow-500/30"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Limited Financial Access",
      description: "Traditional banks don't reward small deposits, leaving users without clear paths to financial growth.",
      statistic: "2.1B",
      statisticLabel: "people lack access to quality financial services",
      iconColor: "text-purple-400",
      statisticColor: "text-purple-400",
      cardBorder: "border-purple-500/30"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            The Savings Challenge
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Millions face barriers to consistent saving due to unpredictable income, lack of 
            motivation, and limited access to rewarding financial tools.
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`bg-slate-800 rounded-2xl p-6 border ${challenge.cardBorder} hover:bg-slate-750 transition-colors duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 ${challenge.iconColor}`}>
                {challenge.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4">
                {challenge.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {challenge.description}
              </p>

              {/* Statistics Card */}
              <div className={`bg-slate-700/50 rounded-lg p-4 border ${challenge.cardBorder}`}>
                <div className={`text-3xl font-bold mb-1 ${challenge.statisticColor}`}>
                  {challenge.statistic}
                </div>
                <div className="text-gray-400 text-sm">
                  {challenge.statisticLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavingsChallenge;