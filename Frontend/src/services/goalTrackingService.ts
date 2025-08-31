import type { UserSavingsData } from './contractService';

export interface SavingsGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  suggestedAmount: number;
  suggestedDuration: number; // days
  category: 'emergency' | 'vacation' | 'purchase' | 'investment' | 'custom';
  icon: string;
}

export interface GoalProgress {
  goalId: string;
  progressPercentage: number;
  daysRemaining: number;
  dailyTargetAmount: number;
  isOnTrack: boolean;
  projectedCompletionDate: Date;
  recommendedAction?: string;
}

export class GoalTrackingService {
  private goals: SavingsGoal[] = [];
  private readonly STORAGE_KEY = 'microsave_goals';

  constructor() {
    this.loadGoals();
  }

  getGoalTemplates(): GoalTemplate[] {
    return [
      {
        id: 'emergency_fund',
        title: 'Emergency Fund',
        description: 'Build a safety net for unexpected expenses',
        suggestedAmount: 1000,
        suggestedDuration: 90,
        category: 'emergency',
        icon: '🛡️'
      },
      {
        id: 'vacation',
        title: 'Dream Vacation',
        description: 'Save for that perfect getaway',
        suggestedAmount: 2000,
        suggestedDuration: 180,
        category: 'vacation',
        icon: '🏖️'
      },
      {
        id: 'gadget',
        title: 'New Gadget',
        description: 'Save for the latest tech or device',
        suggestedAmount: 500,
        suggestedDuration: 60,
        category: 'purchase',
        icon: '📱'
      },
      {
        id: 'investment',
        title: 'Investment Fund',
        description: 'Build capital for future investments',
        suggestedAmount: 5000,
        suggestedDuration: 365,
        category: 'investment',
        icon: '📈'
      },
      {
        id: 'home_down_payment',
        title: 'Home Down Payment',
        description: 'Save for your first home',
        suggestedAmount: 10000,
        suggestedDuration: 730,
        category: 'purchase',
        icon: '🏠'
      }
    ];
  }

  createGoal(
    title: string,
    targetAmount: number,
    deadline: Date,
    description: string = ''
  ): SavingsGoal {
    const goal: SavingsGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      targetAmount,
      currentAmount: 0,
      deadline,
      description,
      isActive: true,
      createdAt: new Date()
    };

    this.goals.push(goal);
    this.saveGoals();
    return goal;
  }

  updateGoalProgress(goalId: string, userData: UserSavingsData): SavingsGoal | null {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) return null;

    // Update current amount based on user's balance
    // This is a simplified approach - in a real app, you'd track goal-specific contributions
    goal.currentAmount = Math.min(parseFloat(userData.balance), goal.targetAmount);
    this.saveGoals();
    return goal;
  }

  getGoalProgress(goalId: string): GoalProgress | null {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) return null;

    const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((goal.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const remainingAmount = goal.targetAmount - goal.currentAmount;
    const dailyTargetAmount = daysRemaining > 0 ? remainingAmount / daysRemaining : 0;
    
    // Calculate if on track based on linear progression
    const totalDays = Math.ceil((goal.deadline.getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = totalDays - daysRemaining;
    const expectedProgress = totalDays > 0 ? (daysPassed / totalDays) * 100 : 0;
    const isOnTrack = progressPercentage >= expectedProgress * 0.8; // 20% tolerance

    // Project completion date based on current rate
    let projectedCompletionDate = goal.deadline;
    if (progressPercentage > 0 && progressPercentage < 100) {
      const currentRate = goal.currentAmount / daysPassed;
      if (currentRate > 0) {
        const projectedDays = Math.ceil(goal.targetAmount / currentRate);
        projectedCompletionDate = new Date(goal.createdAt.getTime() + projectedDays * 24 * 60 * 60 * 1000);
      }
    }

    let recommendedAction: string | undefined;
    if (!isOnTrack && daysRemaining > 0) {
      recommendedAction = `Increase daily deposits to $${dailyTargetAmount.toFixed(2)} to reach your goal on time`;
    } else if (progressPercentage >= 90) {
      recommendedAction = `You're almost there! Just $${remainingAmount.toFixed(2)} more to go!`;
    }

    return {
      goalId,
      progressPercentage: Math.min(100, progressPercentage),
      daysRemaining,
      dailyTargetAmount,
      isOnTrack,
      projectedCompletionDate,
      recommendedAction
    };
  }

  getAllGoals(): SavingsGoal[] {
    return [...this.goals];
  }

  getActiveGoals(): SavingsGoal[] {
    return this.goals.filter(goal => goal.isActive);
  }

  completeGoal(goalId: string): boolean {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) return false;

    goal.isActive = false;
    this.saveGoals();
    return true;
  }

  deleteGoal(goalId: string): boolean {
    const index = this.goals.findIndex(g => g.id === goalId);
    if (index === -1) return false;

    this.goals.splice(index, 1);
    this.saveGoals();
    return true;
  }

  generateGoalInsights(userData: UserSavingsData): string[] {
    const insights: string[] = [];
    const activeGoals = this.getActiveGoals();

    if (activeGoals.length === 0) {
      insights.push("🎯 Consider setting a savings goal to stay motivated and track your progress!");
      return insights;
    }

    activeGoals.forEach(goal => {
      const progress = this.getGoalProgress(goal.id);
      if (!progress) return;

      if (progress.progressPercentage >= 100) {
        insights.push(`🎉 Congratulations! You've reached your "${goal.title}" goal!`);
      } else if (progress.progressPercentage >= 75) {
        insights.push(`🚀 You're ${progress.progressPercentage.toFixed(1)}% towards "${goal.title}" - almost there!`);
      } else if (!progress.isOnTrack) {
        insights.push(`⚠️ "${goal.title}" needs attention - consider increasing your daily deposits to $${progress.dailyTargetAmount.toFixed(2)}`);
      } else if (progress.daysRemaining <= 7) {
        insights.push(`⏰ Only ${progress.daysRemaining} days left for "${goal.title}" - you're on track!`);
      }
    });

    // Suggest new goals based on user's savings pattern
    if (userData.score >= 70 && activeGoals.length < 3) {
      insights.push("💡 Your high consistency score shows you're ready for multiple savings goals!");
    }

    if (parseFloat(userData.balance) >= 500 && !activeGoals.some(g => g.title.toLowerCase().includes('emergency'))) {
      insights.push("🛡️ Consider setting up an emergency fund goal for financial security");
    }

    return insights;
  }

  getOptimalGoalSuggestion(userData: UserSavingsData): GoalTemplate | null {
    const balance = parseFloat(userData.balance);
    const templates = this.getGoalTemplates();

    // Suggest based on user's current financial situation
    if (balance < 500) {
      return templates.find(t => t.id === 'emergency_fund') || null;
    } else if (balance < 2000 && userData.score >= 60) {
      return templates.find(t => t.id === 'vacation') || null;
    } else if (balance >= 2000 && userData.streak >= 14) {
      return templates.find(t => t.id === 'investment') || null;
    }

    return templates.find(t => t.id === 'gadget') || null;
  }

  private saveGoals(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.goals));
    } catch (error) {
      console.error('Failed to save goals to localStorage:', error);
    }
  }

  private loadGoals(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.goals = parsed.map((goal: any) => ({
          ...goal,
          createdAt: new Date(goal.createdAt),
          deadline: new Date(goal.deadline)
        }));
      }
    } catch (error) {
      console.error('Failed to load goals from localStorage:', error);
      this.goals = [];
    }
  }
}

export const goalTrackingService = new GoalTrackingService();
