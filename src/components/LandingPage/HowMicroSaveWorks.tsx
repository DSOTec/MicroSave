import React from 'react';
import { Wallet, Target, TrendingUp, Clock, DollarSign, Bell } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  circleColor: string;
  visualElement: React.ReactNode;
}

interface Feature {
  icon: React.ReactNode;
  text: string;
}

const HowMicroSaveWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "1",
      title: "Connect Your Wallet",
      description: "Connect your crypto wallet or create a new one. We support MetaMask, WalletConnect, and more.",
      icon: <Wallet className="w-6 h-6" />,
      circleColor: "bg-green-500",
      visualElement: (
        <div className="flex space-x-2 mt-6">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>
      )
    },
    {
      number: "2",
      title: "Set Your Goals",
      description: "Define your savings goals with help from our AI assistant. Start small and build momentum.",
      icon: <Target className="w-6 h-6" />,
      circleColor: "bg-blue-600",
      visualElement: (
        <div className="mt-6 bg-slate-700 rounded-lg p-4 w-full max-w-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Emergency Fund</span>
            <span className="text-green-400 text-sm font-semibold">$500</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full w-3/5"></div>
          </div>
        </div>
      )
    },
    {
      number: "3",
      title: "Start Saving",
      description: "Make regular deposits and watch your savings grow. Our AI provides personalized nudges and rewards.",
      icon: <TrendingUp className="w-6 h-6" />,
      circleColor: "bg-orange-500",
      visualElement: (
        <div className="mt-6 bg-slate-700 rounded-lg p-4 w-full max-w-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Today's Progress</span>
            <span className="text-green-400 text-sm font-semibold">+$25</span>
          </div>
        </div>
      )
    }
  ];

  const features: Feature[] = [
    {
      icon: <Clock className="w-5 h-5 text-green-400" />,
      text: "Flexible scheduling - daily, weekly, or monthly"
    },
    {
      icon: <DollarSign className="w-5 h-5 text-green-400" />,
      text: "AI-optimized amounts based on your spending patterns"
    },
    {
      icon: <Bell className="w-5 h-5 text-green-400" />,
      text: "Smart notifications to keep you on track"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How MicroSave Works
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            Get started in minutes and begin your journey to financial freedom with our simple, 
            secure, and intelligent platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Number Circle */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 ${step.circleColor} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-2xl font-bold">{step.number}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Visual Element */}
              <div className="flex justify-center">
                {step.visualElement}
              </div>
            </div>
          ))}
        </div>

        {/* Automated Savings Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h3 className="text-3xl lg:text-4xl font-bold">
              Automated Savings Made Simple
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              Set up recurring deposits, receive AI-powered insights, and watch your savings 
              grow automatically. Our platform handles the complexity while you focus on 
              your goals.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {feature.icon}
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:pl-8">
            <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
              {/* Next Deposit Card */}
              <div className="bg-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Next Deposit</div>
                    <div className="text-3xl font-bold">$25.00</div>
                    <div className="text-gray-400 text-sm">Weekly savings goal</div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">
                    Tomorrow
                  </div>
                </div>
              </div>

              {/* Progress Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-2">This Week</div>
                  <div className="text-xl font-bold">$75.00</div>
                </div>
                <div className="bg-slate-700 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-2">This Month</div>
                  <div className="text-xl font-bold">$300.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowMicroSaveWorks;