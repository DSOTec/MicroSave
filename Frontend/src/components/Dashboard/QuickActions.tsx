import React from 'react';
import { Target, Bot, TrendingUp } from 'lucide-react';

interface QuickActionsProps {
  onSetGoal?: () => void;
  onAIInsights?: () => void;
  onViewAnalytics?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onSetGoal,
  onAIInsights,
  onViewAnalytics
}) => {
  const handleSetGoal = () => {
    onSetGoal?.();
    console.log('Set New Goal clicked');
  };

  const handleAIInsights = () => {
    onAIInsights?.();
    console.log('AI Insights clicked');
  };

  const handleViewAnalytics = () => {
    onViewAnalytics?.();
    console.log('View Analytics clicked');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Quick Actions
        </h2>

        {/* Actions */}
        <div className="space-y-4">
          {/* Set New Goal - Primary Action */}
          <button
            onClick={handleSetGoal}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-start"
          >
            <div className="w-6 h-6 mr-4 border-2 border-white rounded-full border-dashed flex items-center justify-center">
              <Target className="w-3 h-3" />
            </div>
            Set New Goal
          </button>

          {/* AI Insights */}
          <button
            onClick={handleAIInsights}
            className="w-full bg-gray-100 hover:bg-gray-200 text-slate-700 font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-start"
          >
            <Bot className="w-6 h-6 mr-4 text-slate-600" />
            AI Insights
          </button>

          {/* View Analytics */}
          <button
            onClick={handleViewAnalytics}
            className="w-full bg-gray-100 hover:bg-gray-200 text-slate-700 font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-start"
          >
            <TrendingUp className="w-6 h-6 mr-4 text-slate-600" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;