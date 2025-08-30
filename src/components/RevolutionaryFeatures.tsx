import React from 'react';
import { Shield, Check, Globe } from 'lucide-react';

interface Stablecoin {
  symbol: string;
  name: string;
  protocol: string;
  apy: string;
  price: string;
  color: string;
}

interface Feature {
  icon: React.ReactNode;
  text: string;
}

const RevolutionaryFeatures: React.FC = () => {
  const stablecoins: Stablecoin[] = [
    {
      symbol: "USDC",
      name: "USD Coin",
      protocol: "Circle",
      apy: "7.2% APY",
      price: "$1.00",
      color: "bg-blue-500"
    },
    {
      symbol: "USDT",
      name: "Tether",
      protocol: "Tether Ltd",
      apy: "6.8% APY",
      price: "$1.00",
      color: "bg-slate-600"
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      protocol: "MakerDAO",
      apy: "8.1% APY",
      price: "$1.00",
      color: "bg-yellow-500"
    }
  ];

  const features: Feature[] = [
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      text: "Protected against inflation and currency devaluation"
    },
    {
      icon: <Check className="w-5 h-5 text-green-400" />,
      text: "Earn up to 8% APY through smart DeFi integrations"
    },
    {
      icon: <Globe className="w-5 h-5 text-green-400" />,
      text: "Access your funds globally, 24/7"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Revolutionary Features
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            Experience the future of savings with our AI-powered platform that makes building 
            wealth accessible to everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Save with Confidence */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-green-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-400 font-medium">Stablecoin Savings</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl lg:text-4xl font-bold">
              Save with Confidence
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              Save in stable cryptocurrencies like USDC and USDT to protect your 
              savings from volatility while earning competitive yields through DeFi 
              protocols.
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

          {/* Right Column - Supported Stablecoins Dashboard */}
          <div className="lg:pl-8">
            <div className="bg-slate-800 rounded-2xl p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold">Supported Stablecoins</h4>
                <span className="text-green-400 text-sm font-medium">Live Rates</span>
              </div>

              {/* Stablecoins List */}
              <div className="space-y-4">
                {stablecoins.map((coin, index) => (
                  <div
                    key={index}
                    className="bg-slate-700 rounded-xl p-4 flex items-center justify-between hover:bg-slate-650 transition-colors duration-200"
                  >
                    {/* Left Side - Coin Info */}
                    <div className="flex items-center space-x-4">
                      {/* Coin Icon */}
                      <div className={`w-10 h-10 ${coin.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{coin.symbol}</span>
                      </div>
                      
                      {/* Coin Details */}
                      <div>
                        <div className="font-semibold">{coin.name}</div>
                        <div className="text-gray-400 text-sm">{coin.protocol}</div>
                      </div>
                    </div>

                    {/* Right Side - Rates */}
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">{coin.apy}</div>
                      <div className="text-gray-400 text-sm">{coin.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevolutionaryFeatures;