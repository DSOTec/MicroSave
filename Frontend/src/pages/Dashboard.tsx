import NavbarDashboard from '../components/Dashboard/NavbarDashboard'
import SidebarDashboard from '../components/Dashboard/SidebarDashboard'
import YieldFarmingDashboard from '../components/Dashboard/YieldFarmingDashboard'
import TransactionsTable from '../components/Dashboard/TransactionsTable'
import AIAssistantDashboard from '../components/Dashboard/AIAssistantDashboard'
import SecurityDashboard from '../components/Dashboard/SecurityDashboard'

const Dashboard = () => {
  return (
    <>
        <NavbarDashboard />
        <SidebarDashboard />
        <AIAssistantDashboard />
        <TransactionsTable />
        <YieldFarmingDashboard />   
        <SecurityDashboard />
    </>
      
  )
}

export default Dashboard;