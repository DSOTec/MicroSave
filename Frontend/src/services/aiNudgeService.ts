import type { UserSavingsData } from './contractService';
import type { SavingsGoal } from './goalTrackingService';

export interface NudgeMessage {
  id: string;
  type: 'reminder' | 'encouragement' | 'milestone' | 'warning' | 'goal_progress';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  actionRequired?: boolean;
  suggestedAction?: string;
}

export interface AIInsight {
  type: 'pattern' | 'prediction' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  confidence: number; // 0-1
  data?: any;
}

export class AIService {
  private readonly STREAK_THRESHOLD = 7;
  private readonly LOW_SCORE_THRESHOLD = 30;
  private readonly INACTIVE_DAYS_THRESHOLD = 3;

  generateNudges(userData: UserSavingsData, goals: SavingsGoal[]): NudgeMessage[] {
    const nudges: NudgeMessage[] = [];
    const currentDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    // Check for inactivity
    if (userData.lastDepositDay) {
      const daysSinceLastDeposit = currentDay - userData.lastDepositDay;
      
      if (daysSinceLastDeposit >= this.INACTIVE_DAYS_THRESHOLD) {
        nudges.push({
          id: `inactive_${Date.now()}`,
          type: 'reminder',
          title: 'Time to Save! 💰',
          message: `You haven't made a deposit in ${daysSinceLastDeposit} days. Keep your streak alive!`,
          priority: daysSinceLastDeposit > 7 ? 'high' : 'medium',
          timestamp: new Date(),
          actionRequired: true,
          suggestedAction: 'Make a small deposit to maintain your consistency score'
        });
      }
    }

    // Streak milestone celebrations
    if (userData.streak > 0 && userData.streak % this.STREAK_THRESHOLD === 0) {
      nudges.push({
        id: `milestone_${userData.streak}`,
        type: 'milestone',
        title: `🎉 ${userData.streak}-Day Streak!`,
        message: `Amazing! You've maintained a ${userData.streak}-day saving streak. You earned bonus points!`,
        priority: 'high',
        timestamp: new Date(),
        actionRequired: false
      });
    }

    // Low score warnings
    if (userData.score < this.LOW_SCORE_THRESHOLD) {
      nudges.push({
        id: `low_score_${Date.now()}`,
        type: 'warning',
        title: 'Boost Your Savings Score 📈',
        message: `Your consistency score is ${userData.score}/100. Regular deposits will improve your score and earn more rewards!`,
        priority: 'medium',
        timestamp: new Date(),
        actionRequired: true,
        suggestedAction: 'Try to deposit daily for the next week'
      });
    }

    // Goal progress nudges
    goals.forEach(goal => {
      if (goal.isActive) {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const daysUntilDeadline = Math.ceil((goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        
        if (progress < 25 && daysUntilDeadline <= 30) {
          nudges.push({
            id: `goal_behind_${goal.id}`,
            type: 'goal_progress',
            title: `Goal Alert: ${goal.title} 🎯`,
            message: `You're ${progress.toFixed(1)}% towards your goal with ${daysUntilDeadline} days left. Consider increasing your daily deposits!`,
            priority: 'high',
            timestamp: new Date(),
            actionRequired: true,
            suggestedAction: `Deposit $${((goal.targetAmount - goal.currentAmount) / daysUntilDeadline).toFixed(2)} daily to reach your goal`
          });
        } else if (progress >= 75) {
          nudges.push({
            id: `goal_close_${goal.id}`,
            type: 'encouragement',
            title: `Almost There! ${goal.title} 🚀`,
            message: `You're ${progress.toFixed(1)}% towards your goal! Just $${(goal.targetAmount - goal.currentAmount).toFixed(2)} more to go!`,
            priority: 'medium',
            timestamp: new Date(),
            actionRequired: false
          });
        }
      }
    });

    // Frequency-based encouragement
    if (userData.frequency < 10 && userData.frequency > 0) {
      nudges.push({
        id: `frequency_${Date.now()}`,
        type: 'encouragement',
        title: 'Build Your Savings Habit 💪',
        message: `You've saved ${userData.frequency} days this month. Try to reach 15 days for a better consistency score!`,
        priority: 'low',
        timestamp: new Date(),
        actionRequired: false,
        suggestedAction: 'Set a daily reminder to make small deposits'
      });
    }

    return nudges.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  generateInsights(userData: UserSavingsData): AIInsight[] {
    const insights: AIInsight[] = [];

    // Pattern recognition
    if (userData.depositDays.length >= 7) {
      const recentDays = userData.depositDays.slice(-7);
      const pattern = this.detectSavingsPattern(recentDays);
      
      if (pattern) {
        insights.push({
          type: 'pattern',
          title: 'Savings Pattern Detected',
          description: `You tend to save more on ${pattern}. Consider setting up automatic reminders for these days.`,
          confidence: 0.8,
          data: { pattern, days: recentDays }
        });
      }
    }

    // Score prediction
    const predictedScore = this.predictNextScore(userData);
    if (predictedScore !== userData.score) {
      insights.push({
        type: 'prediction',
        title: 'Score Forecast',
        description: `Based on your current pattern, your score could ${predictedScore > userData.score ? 'increase' : 'decrease'} to ${predictedScore} next week.`,
        confidence: 0.7,
        data: { currentScore: userData.score, predictedScore }
      });
    }

    // Personalized recommendations
    const recommendations = this.generateRecommendations(userData);
    recommendations.forEach(rec => insights.push(rec));

    // Achievement recognition
    if (userData.score >= 80) {
      insights.push({
        type: 'achievement',
        title: 'High Performer! 🌟',
        description: `Your consistency score of ${userData.score} puts you in the top tier of savers. Keep up the excellent work!`,
        confidence: 1.0
      });
    }

    return insights;
  }

  private detectSavingsPattern(depositDays: number[]): string | null {
    const dayOfWeekCounts: { [key: number]: number } = {};
    
    depositDays.forEach(dayIndex => {
      const dayOfWeek = dayIndex % 7;
      dayOfWeekCounts[dayOfWeek] = (dayOfWeekCounts[dayOfWeek] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(dayOfWeekCounts));
    const mostCommonDay = Object.keys(dayOfWeekCounts).find(
      day => dayOfWeekCounts[parseInt(day)] === maxCount
    );

    if (maxCount >= 3 && mostCommonDay) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayNames[parseInt(mostCommonDay)];
    }

    return null;
  }

  private predictNextScore(userData: UserSavingsData): number {
    // Simple prediction based on current trend
    const baseScore = userData.score;
    const streakBonus = Math.min(userData.streak * 2, 50);
    const frequencyBonus = Math.min(userData.frequency, 30);
    
    return Math.min(100, Math.floor((streakBonus + frequencyBonus) * 0.8 + baseScore * 0.2));
  }

  private generateRecommendations(userData: UserSavingsData): AIInsight[] {
    const recommendations: AIInsight[] = [];

    if (userData.streak < 7) {
      recommendations.push({
        type: 'recommendation',
        title: 'Build Your Streak',
        description: 'Focus on daily deposits for the next week to establish a strong saving habit and boost your score.',
        confidence: 0.9
      });
    }

    if (userData.frequency < 15) {
      recommendations.push({
        type: 'recommendation',
        title: 'Increase Frequency',
        description: 'Try to save on more days this month. Even small amounts count towards your consistency score.',
        confidence: 0.8
      });
    }

    if (parseFloat(userData.balance) < 100) {
      recommendations.push({
        type: 'recommendation',
        title: 'Build Your Emergency Fund',
        description: 'Consider increasing your deposit amounts to build a stronger financial foundation.',
        confidence: 0.7
      });
    }

    return recommendations;
  }

  generateChatbotResponse(message: string, userData: UserSavingsData): string {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hi there! 👋 I'm your MicroSave AI assistant. Your current savings score is ${userData.score}/100 with a ${userData.streak}-day streak. How can I help you today?`;
    }

    // Score inquiries
    if (lowerMessage.includes('score') || lowerMessage.includes('rating')) {
      return `Your Savings Consistency Score is ${userData.score}/100! This is based on your ${userData.streak}-day streak and ${userData.frequency} deposit days this month. ${userData.score >= 70 ? 'Great job! 🎉' : 'Keep saving regularly to improve your score! 💪'}`;
    }

    // Balance inquiries
    if (lowerMessage.includes('balance') || lowerMessage.includes('money') || lowerMessage.includes('saved')) {
      return `You currently have $${parseFloat(userData.balance).toFixed(2)} saved in your MicroSave account. You've earned ${userData.points} reward points from consistent saving! 💰`;
    }

    // Streak inquiries
    if (lowerMessage.includes('streak')) {
      if (userData.streak > 0) {
        return `Amazing! You're on a ${userData.streak}-day saving streak! 🔥 ${userData.streak >= 7 ? 'You\'ve earned streak bonus points!' : `Just ${7 - userData.streak} more days to earn your first streak bonus!`}`;
      } else {
        return `You don't have an active streak yet. Make a deposit today to start building your saving habit! 🚀`;
      }
    }

    // Goal-related
    if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return `I can help you set and track savings goals! Based on your current saving pattern, I'd recommend starting with a goal of $${(parseFloat(userData.balance) * 1.5).toFixed(2)} over the next 30 days. Would you like me to help you create a personalized savings plan?`;
    }

    // Tips and advice
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
      const tips = [
        `Try the "round up" method - save the spare change from your purchases!`,
        `Set a daily reminder to deposit even $1 - consistency beats amount!`,
        `Your score improves with regular deposits. Even small amounts count!`,
        `Aim for ${Math.max(15, userData.frequency + 5)} deposit days this month to boost your score.`
      ];
      return tips[Math.floor(Math.random() * tips.length)] + ` Your current streak of ${userData.streak} days is ${userData.streak >= 7 ? 'excellent' : 'a great start'}! 💪`;
    }

    // Motivation
    if (lowerMessage.includes('motivate') || lowerMessage.includes('encourage')) {
      const motivations = [
        `You've already saved $${parseFloat(userData.balance).toFixed(2)} - that's amazing progress! 🌟`,
        `Every small deposit builds your financial future. You're doing great! 💪`,
        `Your ${userData.streak}-day streak shows real commitment. Keep it up! 🔥`,
        `${userData.points} reward points earned through consistency - you're building great habits! 🎯`
      ];
      return motivations[Math.floor(Math.random() * motivations.length)];
    }

    // Default response
    return `I'm here to help with your savings journey! You can ask me about your score (${userData.score}/100), balance ($${parseFloat(userData.balance).toFixed(2)}), streak (${userData.streak} days), or get tips for better saving habits. What would you like to know? 🤖💰`;
  }
}

export const aiService = new AIService();
