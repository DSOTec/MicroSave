import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Award, 
  CheckCircle,
  AlertTriangle,
  Users
} from 'lucide-react';

interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AuditReport {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  buttonText: string;
}

const BankLevelSecurity: React.FC = () => {
  const controlFeatures: SecurityFeature[] = [
    {
      id: 'encryption',
      title: 'End-to-end encryption for all data transfers and storage',
      description: '',
      icon: <Lock className="w-5 h-5 text-green-400" />
    },
    {
      id: 'compliance',
      title: 'Fraud controls & authority-verified security tests',
      description: '',
      icon: <Shield className="w-5 h-5 text-green-400" />
    },
    {
      id: 'monitoring',
      title: 'Multi-signature security and fraud threat monitoring',
      description: '',
      icon: <Eye className="w-5 h-5 text-green-400" />
    },
    {
      id: 'protocols',
      title: 'Hardened infrastructure with zero-trust protocols',
      description: '',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    }
  ];

  const securityCards: SecurityFeature[] = [
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      description: 'Auditable smart contract systems that secure your funds',
      icon: <FileText className="w-8 h-8 text-blue-400" />
    },
    {
      id: 'defi-integration',
      title: 'DeFi Integration',
      description: 'Connecting to top-tier decentralized finance protocols securely',
      icon: <Shield className="w-8 h-8 text-green-400" />
    },
    {
      id: 'insurance',
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance coverage for your digital assets',
      icon: <Shield className="w-8 h-8 text-purple-400" />
    },
    {
      id: 'compliance',
      title: 'Web3 Compliance',
      description: 'Industry-standard regulatory compliance and security frameworks',
      icon: <Award className="w-8 h-8 text-yellow-400" />
    }
  ];

  const auditReports: AuditReport[] = [
    {
      id: 'certik',
      title: 'CertiK Audit',
      description: 'Comprehensive security analysis and smart contract verification',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-green-400',
      buttonText: 'View Report'
    },
    {
      id: 'chainalysis',
      title: 'Chainalysis',
      description: 'Blockchain analysis and compliance monitoring',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'text-orange-400',
      buttonText: 'View Report'
    },
    {
      id: 'consensys',
      title: 'ConsenSys Diligence',
      description: 'Advanced security assessment and vulnerability testing',
      icon: <Users className="w-8 h-8" />,
      color: 'text-blue-400',
      buttonText: 'View More'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Bank-Level Security</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your funds are protected by industry-leading security measures, smart contracts, and modern trusted protocols.
          </p>
        </div>

        {/* Main Security Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Your Money, Your Control */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Money, Your Control</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Built on battle-tested blockchain technology with multiple layers of security. Your funds remain fully under your control while benefiting from advanced security controls.
            </p>
            
            <div className="space-y-4">
              {controlFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3">
                  {feature.icon}
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {securityCards.map((card) => (
              <div
                key={card.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Audit Reports */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Security Audit Reports</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our smart contracts have been audited by industry-leading security firms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {auditReports.map((report) => (
            <div
              key={report.id}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-gray-600 transition-all duration-300"
            >
              <div className={`${report.color} mb-6 flex justify-center`}>
                {report.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{report.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {report.description}
              </p>

              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium">
                {report.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Security Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-700">
          <div className="text-center">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Protection</h3>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We employ the same security standards used by major financial institutions, 
              including multi-factor authentication, real-time fraud detection, and 
              continuous security monitoring to keep your assets safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankLevelSecurity;