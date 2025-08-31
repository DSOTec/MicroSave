import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FrequentlyAskedQuestions: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>(['1', '2', '3', '4', '5', '6']); // All open by default to match image

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How does MicroSave work?',
      answer: 'MicroSave is a streamlined savings application that helps individuals implement saving habits, track existing goals, and automate progress. You can set savings goals, track progress, and receive recommendations to help you save more efficiently and reach your financial objectives.'
    },
    {
      id: '2',
      question: 'Is my money safe with MicroSave?',
      answer: 'Yes, your funds are secured through multiple layers of protection. We utilize bank-level security, encryption, smart contracts, and multi-signature protocols. Your money is protected by industry-leading security measures and we integrate with leading financial institutions.'
    },
    {
      id: '3',
      question: 'What interest rates can I expect?',
      answer: 'Our savings plans offer competitive annual percentage yields (APY) ranging from 5.5% to 8.5% APY based on account tier and market conditions. You can diversify across multiple platforms to become even potential better.'
    },
    {
      id: '4',
      question: 'How do I withdraw my savings?',
      answer: 'Our AI assistant analyzes your spending patterns, income, liabilities, and financial goals to provide of the savings and withdrawals. It learns directly from your financial patterns and activity, helping with personalized financial recommendations.'
    },
    {
      id: '5',
      question: 'Can I set multiple savings goals?',
      answer: 'Yes, you can set multiple savings goals with unique timelines, saving rates, tracking and shared with other users to incentivize collaborative saving. This makes saving both interactive and helps you stay on track with regular check-ins.'
    },
    {
      id: '6',
      question: 'What are the fees?',
      answer: 'We provide transparent, easy-to-understand pricing information for goal achievement and account management. Features. This varies by plan type and includes account maintenance, goal tracking, advanced AI financial insights, and financial management tools.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get answers to common questions about MicroSave. Can't find what you're looking for? Feel free to get in touch!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openItems.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-gray-600"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-750 transition-colors"
                >
                  <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you get started with MicroSave and answer any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              View Help Center
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <p className="text-gray-400 text-sm">Learn the basics of saving with MicroSave</p>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-2xl mb-3">💡</div>
            <h3 className="font-semibold mb-2">Tips & Tricks</h3>
            <p className="text-gray-400 text-sm">Maximize your savings potential</p>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Security</h3>
            <p className="text-gray-400 text-sm">Learn about our security measures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;