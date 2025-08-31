import React, { useState } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  Clock, 
  ArrowUpDown, 
  FileText, 
  Camera, 
  Shield,
  Settings
} from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const SidebarDashboard: React.FC<SidebarProps> = ({
  activeItem = 'dashboard',
  onItemClick
}) => {
  const [currentActive, setCurrentActive] = useState(activeItem);

  const handleItemClick = (itemId: string) => {
    setCurrentActive(itemId);
    onItemClick?.(itemId);
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: (
        <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
        </div>
      ),
      label: 'Dashboard'
    },
    {
      id: 'analytics',
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Analytics'
    },
    {
      id: 'cards',
      icon: <CreditCard className="w-6 h-6" />,
      label: 'Cards'
    },
    {
      id: 'history',
      icon: <Clock className="w-6 h-6" />,
      label: 'History'
    },
    {
      id: 'transactions',
      icon: <ArrowUpDown className="w-6 h-6" />,
      label: 'Transactions'
    },
    {
      id: 'documents',
      icon: <FileText className="w-6 h-6" />,
      label: 'Documents'
    },
    {
      id: 'camera',
      icon: <Camera className="w-6 h-6" />,
      label: 'Camera'
    },
    {
      id: 'security',
      icon: <Shield className="w-6 h-6" />,
      label: 'Security'
    },
    {
      id: 'settings',
      icon: <Settings className="w-6 h-6" />,
      label: 'Settings'
    }
  ];

  return (
    <aside className="bg-slate-800 w-20 min-h-screen flex flex-col items-center py-6">
      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2 w-full">
        {sidebarItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`
              relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 mx-auto
              ${currentActive === item.id 
                ? 'bg-slate-700 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }
              ${index === 0 ? '' : 'mt-4'}
            `}
            title={item.label}
            aria-label={item.label}
          >
            {/* Active indicator */}
            {currentActive === item.id && (
              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full"></div>
            )}
            
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarDashboard;