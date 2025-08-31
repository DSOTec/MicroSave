import React, { useState } from 'react';
import { Brain, Play, RotateCcw } from 'lucide-react';
import type { UserSavingsData } from '../../services/contractService';
import ChatBot from './ChatBot';
import NudgePanel from './NudgePanel';
import GoalTracker from './GoalTracker';
import { goalTrackingService } from '../../services/goalTrackingService';

const AITestPanel: React.FC = () => {
  const [mockUserData, setMockUserData] = useState<UserSavingsData | null>(null);
  const [testScenario, setTestScenario] = useState<string>('');

  const mockScenarios = {
    'new_user': {
      balance: '0',
      score: 0,
      streak: 0,
      frequency: 0,
      points: 0,
      depositDays: [],
      lastDepositDay: null,
      totalDeposits: '0'
    },
    'active_saver': {
      balance: '250.50',
      score: 75,
      streak: 12,
      frequency: 18,
      points: 340,
      depositDays: [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22],
      lastDepositDay: 22,
      totalDeposits: '250.50'
    },
    'struggling_saver': {
      balance: '45.25',
      score: 25,
      streak: 0,
      frequency: 3,
      points: 25,
      depositDays: [15, 18, 20],
      lastDepositDay: 20,
      totalDeposits: '45.25'
    },
    'streak_master': {
      balance: '1250.75',
      score: 95,
      streak: 28,
      frequency: 28,
      points: 820,
      depositDays: Array.from({length: 28}, (_, i) => i + 1),
      lastDepositDay: 28,
      totalDeposits: '1250.75'
    }
  };

  const loadMockScenario = (scenario: string) => {
    const data = mockScenarios[scenario as keyof typeof mockScenarios];
    if (data) {
      setMockUserData(data);
      setTestScenario(scenario);
    }
  };

  const resetTest = () => {
    setMockUserData(null);
    setTestScenario('');
    // Clear any existing goals
    goalTrackingService.getAllGoals().forEach(goal => {
      goalTrackingService.deleteGoal(goal.id);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">AI Features Test Panel</h3>
        </div>
        <button
          onClick={resetTest}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Test Scenarios */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Test Scenarios:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(mockScenarios).map(([key, data]) => (
            <button
              key={key}
              onClick={() => loadMockScenario(key)}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                testScenario === key
                  ? 'bg-purple-100 border-purple-500 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Play size={14} />
                <span>{key.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Score: {data.score} | Streak: {data.streak}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Test Data */}
      {mockUserData && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Current Test Data:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Balance:</span>
              <div className="font-semibold">${mockUserData.balance}</div>
            </div>
            <div>
              <span className="text-gray-600">Score:</span>
              <div className="font-semibold">{mockUserData.score}/100</div>
            </div>
            <div>
              <span className="text-gray-600">Streak:</span>
              <div className="font-semibold">{mockUserData.streak} days</div>
            </div>
            <div>
              <span className="text-gray-600">Frequency:</span>
              <div className="font-semibold">{mockUserData.frequency} days</div>
            </div>
            <div>
              <span className="text-gray-600">Points:</span>
              <div className="font-semibold">{mockUserData.points}</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Features Demo */}
      {mockUserData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NudgePanel userData={mockUserData} />
            <GoalTracker userData={mockUserData} />
          </div>
          <ChatBot userData={mockUserData} />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Brain size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select a test scenario above to see AI features in action!</p>
        </div>
      )}
    </div>
  );
};

export default AITestPanel;
