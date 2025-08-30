import React from 'react';
import { Check, Crown, TrendingUp, Sprout } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SavingsPlan {
  id: string;
  name: string;
  description: string;
  apy: string;
  apyColor: string;
  rateDescription: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  buttonText: string;
  buttonColor: string;
  cardBorder: string;
  isPopular?: boolean;
}

const SavingsPlans: React.FC = () => {
  const plans: SavingsPlan[] = [
    {
      id: 'starter',
      name: 'Starter Plan',
      description: 'Perfect for beginners',
      apy: '5.5% APY',
      apyColor: 'text-green-400',
      rateDescription: 'Base interest rate',
      icon: <Sprout className="w-8 h-8 text-green-400" />,
      features: [
        { text: 'Minimum $10 deposits', included: true },
        { text: 'Basic AI insights', included: true },
        { text: 'Mobile app access', included: true },
        { text: '24/7 withdrawals', included: true },
      ],
      buttonText: 'Start Saving',
      buttonColor: 'bg-green-400 hover:bg-green-500 text-gray-900',
      cardBorder: 'border-gray-700',
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      description: 'Accelerate your savings',
      apy: '7.2% APY',
      apyColor: 'text-blue-400',
      rateDescription: 'Enhanced interest rate',
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      features: [
        { text: 'Minimum $25 deposits', included: true },
        { text: 'Advanced AI recommendations', included: true },
        { text: 'Goal tracking & analytics', included: true },
        { text: 'Priority customer support', included: true },
        { text: 'Bonus rewards program', included: true },
      ],
      buttonText: 'Choose Growth',
      buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white',
      cardBorder: 'border-blue-500',
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'Maximum returns',
      apy: '8.5% APY',
      apyColor: 'text-yellow-400',
      rateDescription: 'Premium interest rate',
      icon: <Crown className="w-8 h-8 text-yellow-400" />,
      features: [
        { text: 'Minimum $100 deposits', included: true },
        { text: 'Personal AI financial advisor', included: true },
        { text: 'Advanced portfolio analytics', included: true },
        { text: 'White-glove support', included: true },
        { text: 'Exclusive investment opportunities', included: true },
        { text: 'VIP rewards & benefits', included: true },
      ],
      buttonText: 'Go Premium',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
      cardBorder: 'border-gray-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Savings Plan</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select from our flexible savings plans designed to match your financial goals and risk tolerance.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800 rounded-2xl p-8 border-2 ${plan.cardBorder} transition-all duration-300 hover:scale-105`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="mb-4 flex justify-center">
                  {plan.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* APY Display */}
              <div className="text-center mb-8">
                <div className={`text-3xl font-bold mb-1 ${plan.apyColor}`}>
                  {plan.apy}
                </div>
                <p className="text-gray-400 text-sm">{plan.rateDescription}</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.buttonColor}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Compare All Plans Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Compare All Plans</h2>
            <p className="text-gray-400">
              Compare features across all savings plans. See which one fits your needs and long-term goals.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Feature Column */}
            <div className="space-y-4">
              <div className="h-12"></div> {/* Spacer for alignment */}
              <div className="text-sm text-gray-400 py-3">Minimum Deposit</div>
              <div className="text-sm text-gray-400 py-3">Interest Rate</div>
              <div className="text-sm text-gray-400 py-3">AI Features</div>
              <div className="text-sm text-gray-400 py-3">Support Level</div>
              <div className="text-sm text-gray-400 py-3">Special Benefits</div>
            </div>

            {/* Plan Comparison Columns */}
            {plans.map((plan) => (
              <div key={`compare-${plan.id}`} className="space-y-4">
                {/* Plan Header */}
                <div className="text-center">
                  <div className={`text-2xl font-bold ${plan.apyColor} mb-1`}>
                    {plan.apy.split(' ')[0]}
                  </div>
                  <div className="text-sm text-gray-400">{plan.name}</div>
                </div>

                {/* Comparison Features */}
                <div className="text-sm text-center py-3 border-t border-gray-700">
                  {plan.id === 'starter' && '$10'}
                  {plan.id === 'growth' && '$25'}
                  {plan.id === 'premium' && '$100'}
                </div>
                
                <div className={`text-sm text-center py-3 border-t border-gray-700 font-semibold ${plan.apyColor}`}>
                  {plan.apy}
                </div>
                
                <div className="text-sm text-center py-3 border-t border-gray-700">
                  {plan.id === 'starter' && 'Basic AI'}
                  {plan.id === 'growth' && 'Advanced AI'}
                  {plan.id === 'premium' && 'Personal AI'}
                </div>
                
                <div className="text-sm text-center py-3 border-t border-gray-700">
                  {plan.id === 'starter' && 'Standard'}
                  {plan.id === 'growth' && 'Priority'}
                  {plan.id === 'premium' && 'White-glove'}
                </div>
                
                <div className="text-sm text-center py-3 border-t border-gray-700">
                  {plan.id === 'starter' && 'Basic rewards'}
                  {plan.id === 'growth' && 'Bonus program'}
                  {plan.id === 'premium' && 'VIP benefits'}
                </div>
              </div>
            ))}
          </div>

          {/* Compare Button */}
          <div className="mt-8 text-center">
            <button className="bg-green-500 hover:bg-green-600 text-gray-900 px-8 py-3 rounded-xl font-semibold transition-all duration-200">
              View Detailed Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlans;