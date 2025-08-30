import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface NewsletterComponentProps {}

const NewsletterComponent: React.FC<NewsletterComponentProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      // Reset after 3 seconds for demo purposes
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const features = [
    'Weekly market insights',
    'Exclusive features preview',
    'Community highlights'
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-lg mx-auto">
            Get weekly insights on DeFi savings, financial tips, and exclusive updates about new MicroSave features.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && email.trim()) {
                  handleSubmit(e as any);
                }
              }}
            />
            <button
              onClick={(e) => handleSubmit(e as any)}
              disabled={isSubscribed}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
          
          <p className="text-slate-400 text-sm text-center">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterComponent;