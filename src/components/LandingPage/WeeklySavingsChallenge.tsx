import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  Award
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  timeLeft: string;
  participants: number;
}

const WeeklySavingsChallenge: React.FC = () => {
  const [currentChallenge] = useState<Challenge>({
    id: 'weekly-50',
    title: 'Save $50 This Week',
    description: 'Join 2,847 other savers',
    target: 50,
    current: 32,
    reward: '$5,000 USDC',
    timeLeft: '3 days left',
    participants: 2847
  });

  const progress = (currentChallenge.current / currentChallenge.target) * 100;

  const pastChallenges = [
    {
      id: '1',
      title: 'Emergency Fund Builder',
      participants: '3,200+ participants',
      reward: '$10K Prize Pool',
      status: 'completed',
      icon: <Award className="w-6 h-6 text-yellow-400" />
    },
    {
      id: '2',
      title: 'Vacation Savings Sprint',
      participants: '1,850+ participants',
      reward: '$7.5K Prize Pool',
      status: 'upcoming',
      icon: <Target className="w-6 h-6 text-blue-400" />
    },
    {
      id: '3',
      title: 'Holiday Shopping Challenge',
      participants: '4,100+ participants',
      reward: '$15K Prize Pool',
      status: 'upcoming',
      icon: <Trophy className="w-6 h-6 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Weekly Savings Challenges</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Participate in community challenges to boost your savings habits and earn rewards with thousands of other savers.
          </p>
        </div>

        {/* Current Challenge */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 border border-blue-500/30 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Challenge Details */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Current Challenge
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-3">{currentChallenge.title}</h2>
              <p className="text-gray-300 mb-6">{currentChallenge.description}</p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">
                    ${currentChallenge.current} / ${currentChallenge.target}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{Math.round(progress)}% Complete</span>
                  <span className="text-xs text-gray-500">${currentChallenge.target - currentChallenge.current} to go</span>
                </div>
              </div>

              {/* Challenge Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{currentChallenge.timeLeft}</div>
                  <div className="text-xs text-gray-400">Time Remaining</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{currentChallenge.participants.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Participants</div>
                </div>
              </div>
            </div>

            {/* Right Side - Reward */}
            <div className="text-center lg:text-right">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="mb-4">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto lg:ml-auto lg:mr-0" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Prize Pool</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {currentChallenge.reward}
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Shared among top performers
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors w-full">
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Past & Upcoming Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">More Challenges</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  {challenge.icon}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {challenge.status === 'completed' ? 'Completed' : 'Coming Soon'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{challenge.participants}</p>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Prize Pool:</span>
                    <span className="font-semibold text-green-400">{challenge.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of successful savers in our weekly challenges and build lasting financial habits.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Start Your First Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklySavingsChallenge;