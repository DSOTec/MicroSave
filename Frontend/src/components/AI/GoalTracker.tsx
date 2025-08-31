import React, { useState, useEffect } from 'react';
import { Target, Plus, Calendar, TrendingUp, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { goalTrackingService } from '../../services/goalTrackingService';
import type { GoalTemplate, GoalProgress, SavingsGoal } from '../../services/goalTrackingService';
import type { UserSavingsData } from '../../services/contractService';
import { cn } from '../../lib/utils';

interface GoalTrackerProps {
  userData: UserSavingsData | null;
  className?: string;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ userData, className }) => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [goalProgress, setGoalProgress] = useState<{ [key: string]: GoalProgress }>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);

  useEffect(() => {
    loadGoals();
  }, [userData]);

  const loadGoals = () => {
    const activeGoals = goalTrackingService.getActiveGoals();
    setGoals(activeGoals);

    // Update progress for each goal
    const progressMap: { [key: string]: GoalProgress } = {};
    activeGoals.forEach(goal => {
      if (userData) {
        goalTrackingService.updateGoalProgress(goal.id, userData);
        const progress = goalTrackingService.getGoalProgress(goal.id);
        if (progress) {
          progressMap[goal.id] = progress;
        }
      }
    });
    setGoalProgress(progressMap);
  };

  const handleCreateGoal = (template?: GoalTemplate) => {
    if (template) {
      setSelectedTemplate(template);
    }
    setShowCreateModal(true);
    setShowTemplates(false);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      goalTrackingService.deleteGoal(goalId);
      loadGoals();
    }
  };

  const getProgressColor = (percentage: number, isOnTrack: boolean) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (isOnTrack) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!userData) {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <div className="text-center text-gray-500">
          <Target size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Goal Tracking</h3>
          <p>Connect your wallet to start tracking your savings goals!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-md", className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="text-green-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Savings Goals</h3>
              <p className="text-sm text-gray-600">{goals.length} active goals</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>New Goal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target size={48} className="mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No Goals Yet</h4>
            <p className="text-gray-500 mb-4">Set your first savings goal to stay motivated!</p>
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = goalProgress[goal.id];
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{goal.title}</h4>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Due {formatDate(goal.deadline)}</span>
                      </span>
                      {progress && (
                        <span className="flex items-center space-x-1">
                          <TrendingUp size={14} />
                          <span>{progress.daysRemaining} days left</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {progress && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {progress.progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          getProgressColor(progress.progressPercentage, progress.isOnTrack)
                        )}
                        style={{ width: `${Math.min(100, progress.progressPercentage)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status and Recommendations */}
                {progress && (
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {progress.progressPercentage >= 100 ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : progress.isOnTrack ? (
                        <TrendingUp className="text-blue-500" size={16} />
                      ) : (
                        <AlertCircle className="text-red-500" size={16} />
                      )}
                      <span className={cn(
                        "text-sm font-medium",
                        progress.progressPercentage >= 100 ? "text-green-700" :
                        progress.isOnTrack ? "text-blue-700" : "text-red-700"
                      )}>
                        {progress.progressPercentage >= 100 ? "Goal Completed! 🎉" :
                         progress.isOnTrack ? "On Track" : "Behind Schedule"}
                      </span>
                    </div>
                    {progress.recommendedAction && (
                      <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded max-w-xs">
                        💡 {progress.recommendedAction}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Goal Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Choose a Goal Template</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {goalTrackingService.getGoalTemplates().map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleCreateGoal(template)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-2">{template.icon}</div>
                  <h4 className="font-semibold mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      {formatCurrency(template.suggestedAmount)}
                    </span>
                    <span className="text-gray-500">
                      {template.suggestedDuration} days
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleCreateGoal()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <Plus className="mx-auto mb-2" size={24} />
              <span>Create Custom Goal</span>
            </button>
          </div>
        </div>
      )}

      {/* Create Goal Modal */}
      {showCreateModal && (
        <CreateGoalModal
          template={selectedTemplate}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedTemplate(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setSelectedTemplate(null);
            loadGoals();
          }}
        />
      )}
    </div>
  );
};

// Create Goal Modal Component
interface CreateGoalModalProps {
  template: GoalTemplate | null;
  onClose: () => void;
  onSave: () => void;
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ template, onClose, onSave }) => {
  const [title, setTitle] = useState(template?.title || '');
  const [description, setDescription] = useState(template?.description || '');
  const [targetAmount, setTargetAmount] = useState(template?.suggestedAmount || 1000);
  const [duration, setDuration] = useState(template?.suggestedDuration || 90);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + duration);
    
    goalTrackingService.createGoal(title, targetAmount, deadline, description);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {template ? `Create ${template.title}` : 'Create Custom Goal'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount ($)
            </label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Days)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalTracker;
