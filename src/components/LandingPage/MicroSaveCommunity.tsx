import React from 'react';
import { 
  Users, 
  Heart, 
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface UserTestimonial {
  id: string;
  name: string;
  avatar: string;
  message: string;
  verified?: boolean;
}

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  savings: string;
  badge?: string;
  badgeColor?: string;
}

interface CommunityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor: string;
  iconColor: string;
}

const MicroSaveCommunity: React.FC = () => {
  const testimonials: UserTestimonial[] = [
    {
      id: '1',
      name: 'Sarah M.',
      avatar: '👩‍💼',
      message: 'MicroSave helped me save $5,000 in 6 months for my dream vacation. The community support was incredible!',
      verified: true
    },
    {
      id: '2',
      name: 'Mike L.',
      avatar: '👨‍💻',
      message: 'The community challenges made saving fun and motivating. I\'ve never been more consistent with my savings habits.'
    },
    {
      id: '3',
      name: 'Emma K.',
      avatar: '👩‍🎓',
      message: 'Amazing community! The tips and encouragement from other members helped me reach my emergency fund goal faster than expected.'
    }
  ];

  const leaderboard: LeaderboardUser[] = [
    {
      id: '1',
      rank: 1,
      name: 'Alex R.',
      avatar: '👨‍🚀',
      savings: '$2,456',
      badge: '🏆',
      badgeColor: 'text-yellow-400'
    },
    {
      id: '2',
      rank: 2,
      name: 'Emma T.',
      avatar: '👩‍🔬',
      savings: '$2,135',
      badge: '🥈',
      badgeColor: 'text-gray-300'
    },
    {
      id: '3',
      rank: 3,
      name: 'David C.',
      avatar: '👨‍🎨',
      savings: '$1,890',
      badge: '🥉',
      badgeColor: 'text-orange-400'
    },
    {
      id: '4',
      rank: 4,
      name: 'Lisa Jane',
      avatar: '👩‍🏫',
      savings: '$1,847',
      badge: '⭐',
      badgeColor: 'text-blue-400'
    }
  ];

  const communityFeatures: CommunityFeature[] = [
    {
      id: 'connect',
      title: 'Connect Community',
      description: 'Join live discussions, share tips, and connect with thousands of savers worldwide.',
      icon: <Users className="w-8 h-8" />,
      buttonText: 'Join Now',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      iconColor: 'text-blue-400'
    },
    {
      id: 'updates',
      title: 'Social Updates',
      description: 'Follow top savers, get daily tips and celebrate financial milestones together.',
      icon: <Heart className="w-8 h-8" />,
      buttonText: 'Follow Friends',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      iconColor: 'text-pink-400'
    },
    {
      id: 'performance',
      title: 'Share Performance',
      description: 'Share your savings progress with others and get motivated by community achievements.',
      icon: <TrendingUp className="w-8 h-8" />,
      buttonText: 'Share Progress',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      iconColor: 'text-gray-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Join the MicroSave Community</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with thousands of savers worldwide, share experiences, and learn from successful financial journeys.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Build Habits Together */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Build Habits Together</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join a supportive community of savers with shared goals and mutual support comes from like-minded individuals worldwide.
            </p>


            {/* User Testimonials */}
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Community Leaderboard */}
          <div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Community Leaderboard</h3>
                <span className="text-green-400 text-sm">This Week</span>
              </div>

              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{user.avatar}</span>
                        {user.badge && (
                          <span className="text-lg">{user.badge}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-gray-400 text-xs">Rank #{user.rank}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{user.savings}</div>
                      <div className="text-gray-400 text-xs">Total Saved</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {communityFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-gray-600 transition-all duration-300"
            >
              <div className={`${feature.iconColor} mb-6 flex justify-center`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                {feature.description}
              </p>

              <button className={`${feature.buttonColor} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200`}>
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-400 text-sm">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">$2.4M</div>
            <div className="text-gray-400 text-sm">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
            <div className="text-gray-400 text-sm">Goal Achievement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.9★</div>
            <div className="text-gray-400 text-sm">Community Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroSaveCommunity;