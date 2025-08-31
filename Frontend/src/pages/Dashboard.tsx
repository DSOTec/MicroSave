import NavbarDashboard from '../components/Dashboard/NavbarDashboard'
import SidebarDashboard from '../components/Dashboard/SidebarDashboard'
import YieldFarmingDashboard from '../components/Dashboard/YieldFarmingDashboard'
import TransactionsTable from '../components/Dashboard/TransactionsTable'
import AIAssistantDashboard from '../components/Dashboard/AIAssistantDashboard'
import SecurityDashboard from '../components/Dashboard/SecurityDashboard'
import CommunitySupport from '../components/Dashboard/CommunitySupport'
import SavingsInterface from '../components/Dashboard/SavingsInterface'
const Dashboard = () => {
  return (
    <>
        <NavbarDashboard />
        <SidebarDashboard />
        <SavingsInterface />
        <AIAssistantDashboard />
        <TransactionsTable />
        <YieldFarmingDashboard />   
        <SecurityDashboard />
        <CommunitySupport />
    </>
      
  )
}

export default Dashboard;