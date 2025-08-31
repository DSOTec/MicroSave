import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Lightbulb } from 'lucide-react';
import { aiService } from '../../services/aiNudgeService';
import type { UserSavingsData } from '../../services/contractService';
import { cn } from '../../lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatBotProps {
  userData: UserSavingsData | null;
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ userData, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSuggestions = [
    "What's my savings score?",
    "How can I improve my streak?",
    "Show my balance",
    "Give me saving tips",
    "Help me set a goal"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when first opened
      const welcomeMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content: userData 
          ? `Hi! 👋 I'm your MicroSave AI assistant. I can see you have a ${userData.score}/100 savings score with a ${userData.streak}-day streak. How can I help you today?`
          : "Hi! 👋 I'm your MicroSave AI assistant. Connect your wallet to get personalized insights about your savings journey!",
        timestamp: new Date(),
        suggestions: userData ? quickSuggestions.slice(0, 3) : []
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = userData 
        ? aiService.generateChatbotResponse(message, userData)
        : "Please connect your wallet first to get personalized savings insights and recommendations!";

      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        suggestions: generateSuggestions(message)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('score')) {
      return ["How can I improve my score?", "What affects my score?", "Show my streak"];
    } else if (lowerMessage.includes('goal')) {
      return ["Create a new goal", "Show goal templates", "Track my progress"];
    } else if (lowerMessage.includes('tip')) {
      return ["More saving strategies", "Set up reminders", "Best practices"];
    }
    
    return quickSuggestions.slice(0, 2);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageCircle size={24} />
          {userData && userData.score < 50 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">MicroSave AI</h3>
                <p className="text-xs opacity-90">Your savings assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={cn(
                  "flex items-start space-x-2",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}>
                  {message.type === 'bot' && (
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <Bot size={16} className="text-blue-600" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  )}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1 opacity-70",
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    )}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="bg-gray-100 rounded-full p-2 flex-shrink-0">
                      <User size={16} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-10">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                  <Bot size={16} className="text-blue-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-2">
                  <Lightbulb size={14} className="text-yellow-500" />
                  <span className="text-xs text-gray-600">Quick actions:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your savings..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
