import CommunitySupport from '@/components/Dashboard/CommunitySupport'
import QuickActions from '@/components/Dashboard/QuickActions'
import SavingsBalance from '@/components/Dashboard/SavingsBalance'
import NavbarDashboard from '../components/Dashboard/NavbarDashboard'
import SidebarDashboard from '../components/Dashboard/SidebarDashboard'

const Dashboard = () => {
  return (
    <>
        <NavbarDashboard />
        <SidebarDashboard />
        <SavingsBalance />
        <QuickActions />
        <CommunitySupport />
   
   
    </>
      
  )
}

export default Dashboard;