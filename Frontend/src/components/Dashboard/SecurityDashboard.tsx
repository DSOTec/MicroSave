import React from 'react';
import { Shield, Wallet, Key, AlertTriangle, ExternalLink, Copy, Info } from 'lucide-react';

interface SecurityItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  status: 'enabled' | 'connected' | 'secured' | 'pending';
  bgColor: string;
  iconColor: string;
}

const SecurityItem: React.FC<SecurityItemProps> = ({ icon, title, status, bgColor, iconColor }) => {
  const IconComponent = icon;
  return (
    <div className={`${bgColor} rounded-lg p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 ${iconColor} rounded-full flex items-center justify-center`}>
          <IconComponent size={12} className="text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {status === 'pending' ? (
          <AlertTriangle size={16} className="text-yellow-600" />
        ) : (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

const SecurityDashboard: React.FC = () => {
  const contractAddress = "0x742d35cc647c32be4ef32bda2f35d5";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Status Card */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security Status</h2>
                <p className="text-sm text-gray-600">Account Security</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <SecurityItem
                icon={Shield}
                title="2FA Enabled"
                status="enabled"
                bgColor="bg-green-50"
                iconColor="bg-green-500"
              />
              
              <SecurityItem
                icon={Wallet}
                title="Hardware Wallet Connected"
                status="connected"
                bgColor="bg-green-50"
                iconColor="bg-green-500"
              />
              
              <SecurityItem
                icon={Key}
                title="Backup Phrase Secured"
                status="secured"
                bgColor="bg-green-50"
                iconColor="bg-green-500"
              />
              
              <SecurityItem
                icon={AlertTriangle}
                title="Email Verification Pending"
                status="pending"
                bgColor="bg-yellow-50"
                iconColor="bg-yellow-500"
              />
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
              Security Settings
            </button>
          </div>

          {/* Smart Contract Information Card */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Smart Contract Information</h2>

            {/* Contract Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">MicroSave Vault</h3>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Verified
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span className="truncate">{contractAddress}...</span>
                <button 
                  onClick={() => copyToClipboard(contractAddress)}
                  className="hover:text-gray-700 transition-colors"
                >
                  <Copy size={12} />
                </button>
                <button className="hover:text-gray-700 transition-colors">
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>

            {/* Contract Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">$2.4M</p>
                <p className="text-xs text-gray-500">Total Locked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-gray-500">Active Users</p>
              </div>
            </div>

            {/* Audit Information */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                  <Info size={12} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">Audit Status</h4>
                  <p className="text-xs text-blue-700 mb-2">
                    Last audited by CertiK on December 15, 2024. No critical issues found.
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
                    View Audit Report
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Average</span>
                <span className="font-semibold text-gray-900">$1,247</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Best Month</span>
                <span className="font-semibold text-green-600">$2,100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Goal Completion</span>
                <span className="font-semibold text-gray-900">67%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time to Emergency Fund</span>
                <span className="font-semibold text-blue-600">4 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
