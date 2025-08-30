import React from 'react';
import { Moon, Bell } from 'lucide-react';

interface NavbarProps {
  userName?: string;
  userAddress?: string;
  avatarUrl?: string;
  notificationCount?: number;
  isConnected?: boolean;
  onThemeToggle?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const NavbarDashboard: React.FC<NavbarProps> = ({
  userName = "Sarah Chen",
  userAddress = "0x742d...9A8f",
  avatarUrl = "/api/placeholder/32/32",
  notificationCount = 3,
  isConnected = true,
  onThemeToggle,
  onNotificationClick,
  onProfileClick
}) => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
      {/* Left Section - Logo and Connection Status */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">
          MicroSave Dashboard
        </h1>
        
        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-sm text-gray-300">
            {isConnected ? 'Connected to Ethereum' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Right Section - Theme Toggle, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          <Moon className="w-5 h-5 text-gray-300" />
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationClick}
          className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-300" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <button
          onClick={onProfileClick}
          className="flex items-center space-x-3 hover:bg-slate-700 rounded-lg p-2 transition-colors"
          aria-label="User profile"
        >
          <img
            src={avatarUrl}
            alt={userName}
            className="w-8 h-8 rounded-full border-2 border-gray-600"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {userName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">{userName}</div>
            <div className="text-xs text-gray-400">{userAddress}</div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default NavbarDashboard;