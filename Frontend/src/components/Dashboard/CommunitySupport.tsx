import React from 'react';
import { Users, MessageCircle, Mail, Clock, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

interface SupportOptionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
}

const SupportOption: React.FC<SupportOptionProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  iconBg 
}) => (
  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
    <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
      <Icon size={16} className="text-white" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

const CommunitySupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Community Card */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Community</h2>

            {/* Community Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <StatItem value="12.4K" label="Discord Members" />
              <StatItem value="8.7K" label="Twitter Followers" />
              <StatItem value="3.2K" label="Active Users" />
              <StatItem value="95%" label="Satisfaction Rate" />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Users size={16} />
                Join Discord
              </button>
              
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                </svg>
                Follow on Twitter
              </button>
            </div>
          </div>

          {/* Support Center Card */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Support Center</h2>

            {/* Support Options */}
            <div className="space-y-1 mb-6">
              <SupportOption
                icon={HelpCircle}
                title="FAQ"
                description="Find answers to common questions"
                iconBg="bg-blue-500"
              />
              
              <SupportOption
                icon={MessageCircle}
                title="Live Chat"
                description="Get instant help from our team"
                iconBg="bg-green-500"
              />
              
              <SupportOption
                icon={Mail}
                title="Email Support"
                description="Send us a detailed message"
                iconBg="bg-purple-500"
              />
            </div>

            {/* Response Time Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                  <Clock size={12} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">Response Time</h4>
                  <p className="text-xs text-blue-700 mb-1">
                    Average response time: 2-4 hours
                  </p>
                  <p className="text-xs text-blue-600">
                    Live chat: Available 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Support Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Support Tickets</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Resolved This Week</span>
                <span className="font-semibold text-green-600">89</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Rating</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">4.8</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;