import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Brain, 
  CreditCard, 
  BarChart3, 
  Star,
  Send,
  Bot
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  stats?: {
    value: string;
    label: string;
  };
}

const AISavingsAssistant: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot' as const,
      message: 'Good morning! How can I assist you with your savings goals today?'
    },
    {
      id: 2,
      type: 'user' as const,
      message: 'I want to save for a car and vacation this year'
    },
    {
      id: 3,
      type: 'bot' as const,
      message: 'Great goals! Let me help you create a savings plan for both. How much are you looking to spend on each?'
    }
  ]);

  const mainFeatures: Feature[] = [
    {
      id: 'guidance',
      title: 'Intelligent Financial Guidance',
      description: 'Our AI analyzes your financial situation, spending patterns, and goals to provide personalized savings strategies that actually work for your lifestyle.',
      icon: <Brain className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      id: 'goal-setting',
      title: 'Goal Setting',
      description: 'Set specific savings goals and track your progress with intelligent insights and recommendations.',
      icon: <Target className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      id: 'smart-budgets',
      title: 'Smart Budgets',
      description: 'Create intelligent budgets that automatically adjust to your spending patterns and optimize for your goals.',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      id: 'spending-analysis',
      title: 'Spending Analysis',
      description: 'Get detailed insights into your spending patterns with AI-powered categorization and trend analysis.',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      description: 'Track your financial progress with detailed analytics and receive personalized recommendations to stay on track.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  const bottomFeatures: Feature[] = [
    {
      id: 'expert-spending',
      title: 'Expert Spend Spending',
      description: 'Advanced spending optimization with machine learning insights to maximize your savings potential.',
      icon: <Brain className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      stats: {
        value: '$50',
        label: 'Average monthly savings'
      }
    },
    {
      id: 'behavioral-research',
      title: 'Behavioral Research',
      description: 'Personalized behavioral insights combining psychology and AI to help you build lasting financial habits.',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      stats: {
        value: '1,247',
        label: 'Success stories'
      }
    },
    {
      id: 'smart-features',
      title: 'Smart Features',
      description: 'Intelligent automation and smart notifications to help you save more and spend smarter every day.',
      icon: <Star className="w-8 h-8" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      stats: {
        value: '$12',
        label: 'Monthly cost'
      }
    },
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        message: chatMessage
      }]);
      setChatMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1,
          type: 'bot',
          message: 'I understand! Let me help you create a customized savings plan for your car and vacation goals.'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Your AI Savings Assistant</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Our intelligent AI assistant analyzes your financial habits, provides personalized recommendations, and helps you stay on track with your savings goals.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Features */}
          <div>
            <div className="mb-8">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                AI-Powered Guidance
              </span>
            </div>

            <div className="space-y-8">
              {mainFeatures.map((feature) => (
                <div key={feature.id} className="flex space-x-4">
                  <div className={`${feature.bgColor} ${feature.color} p-3 rounded-xl flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - AI Chat Interface */}
          <div className="lg:pl-8">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 h-full">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant Chat</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 h-64 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {bottomFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-gray-600 transition-all duration-300"
            >
              <div className={`${feature.bgColor} ${feature.color} p-4 rounded-xl w-fit mx-auto mb-6`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {feature.description}
              </p>

              {feature.stats && (
                <div className="border-t border-gray-700 pt-6">
                  <div className={`text-2xl font-bold ${feature.color} mb-1`}>
                    {feature.stats.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {feature.stats.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISavingsAssistant;