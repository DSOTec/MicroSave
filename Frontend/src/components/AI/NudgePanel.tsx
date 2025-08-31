import React, { useState, useEffect } from 'react';
import { Bell, X, Target, TrendingUp, AlertTriangle, Star, ChevronRight } from 'lucide-react';
import type { NudgeMessage, AIInsight } from '../../services/aiNudgeService';
import { aiService } from '../../services/aiNudgeService';
import type { UserSavingsData } from '../../services/contractService';
import { goalTrackingService } from '../../services/goalTrackingService';
import { cn } from '../../lib/utils';

interface NudgePanelProps {
  userData: UserSavingsData | null;
  className?: string;
}

const NudgePanel: React.FC<NudgePanelProps> = ({ userData, className }) => {
  const [nudges, setNudges] = useState<NudgeMessage[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [dismissedNudges, setDismissedNudges] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (userData) {
      const goals = goalTrackingService.getActiveGoals();
      const generatedNudges = aiService.generateNudges(userData, goals);
      const generatedInsights = aiService.generateInsights(userData);
      
      setNudges(generatedNudges);
      setInsights(generatedInsights);
    }
  }, [userData]);

  const handleDismissNudge = (nudgeId: string) => {
    setDismissedNudges(prev => new Set([...prev, nudgeId]));
  };

  const visibleNudges = nudges.filter(nudge => !dismissedNudges.has(nudge.id));
  const highPriorityNudges = visibleNudges.filter(nudge => nudge.priority === 'high');

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="text-red-500" size={16} />;
      case 'medium': return <Bell className="text-yellow-500" size={16} />;
      case 'low': return <TrendingUp className="text-blue-500" size={16} />;
      default: return <Bell className="text-gray-500" size={16} />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Star className="text-yellow-500" size={16} />;
      case 'prediction': return <TrendingUp className="text-blue-500" size={16} />;
      case 'recommendation': return <Target className="text-green-500" size={16} />;
      case 'pattern': return <TrendingUp className="text-purple-500" size={16} />;
      default: return <Bell className="text-gray-500" size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  if (!userData) {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <div className="text-center text-gray-500">
          <Bell size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">AI Insights Waiting</h3>
          <p>Connect your wallet to receive personalized savings nudges and insights!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-md", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-800">AI Insights</h3>
            {highPriorityNudges.length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {highPriorityNudges.length} urgent
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronRight 
              size={20} 
              className={cn("transition-transform", isExpanded && "rotate-90")} 
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={cn("transition-all duration-300", isExpanded ? "max-h-96 overflow-y-auto" : "max-h-48 overflow-hidden")}>
        {/* High Priority Nudges */}
        {highPriorityNudges.length > 0 && (
          <div className="p-4 space-y-3">
            <h4 className="text-sm font-medium text-red-700 flex items-center space-x-1">
              <AlertTriangle size={14} />
              <span>Urgent Actions</span>
            </h4>
            {highPriorityNudges.slice(0, 2).map((nudge) => (
              <div
                key={nudge.id}
                className={cn("border-l-4 p-3 rounded-r-lg", getPriorityColor(nudge.priority))}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getPriorityIcon(nudge.priority)}
                      <h5 className="font-medium text-sm">{nudge.title}</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{nudge.message}</p>
                    {nudge.suggestedAction && (
                      <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        💡 {nudge.suggestedAction}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDismissNudge(nudge.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Nudges */}
        {visibleNudges.filter(n => n.priority !== 'high').length > 0 && (
          <div className="p-4 space-y-3 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700">Recommendations</h4>
            {visibleNudges
              .filter(n => n.priority !== 'high')
              .slice(0, isExpanded ? 10 : 2)
              .map((nudge) => (
              <div
                key={nudge.id}
                className={cn("border-l-4 p-3 rounded-r-lg", getPriorityColor(nudge.priority))}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getPriorityIcon(nudge.priority)}
                      <h5 className="font-medium text-sm">{nudge.title}</h5>
                    </div>
                    <p className="text-sm text-gray-700">{nudge.message}</p>
                  </div>
                  <button
                    onClick={() => handleDismissNudge(nudge.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        {insights.length > 0 && (
          <div className="p-4 space-y-3 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700">AI Insights</h4>
            {insights.slice(0, isExpanded ? 10 : 2).map((insight, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                <div className="flex items-start space-x-2">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-gray-800 mb-1">{insight.title}</h5>
                    <p className="text-sm text-gray-700">{insight.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="bg-white px-2 py-1 rounded text-xs text-gray-600">
                        {insight.type}
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {Math.round(insight.confidence * 100)}% confidence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {visibleNudges.length === 0 && insights.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            <Star size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Great job! No urgent actions needed.</p>
            <p className="text-xs text-gray-400 mt-1">Keep up your consistent saving habits!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {(visibleNudges.length > 2 || insights.length > 2) && !isExpanded && (
        <div className="p-3 border-t border-gray-200 text-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Insights ({visibleNudges.length + insights.length} total)
          </button>
        </div>
      )}
    </div>
  );
};

export default NudgePanel;
