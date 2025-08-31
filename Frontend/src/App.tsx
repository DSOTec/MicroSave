
import {  Routes, Route } from "react-router";
import Navbar  from './components/LandingPage/Navbar'
import HeroSection from './components/LandingPage/HeroSection'
import SavingsChallenge from './components/LandingPage/SavingsChallenge'
import RevolutionaryFeatures from './components/LandingPage/RevolutionaryFeatures'
import HowMicroSaveWorks from './components/LandingPage/HowMicroSaveWorks'
import SavingsPlans from './components/LandingPage/SavingsPlans'
import AISavingsAssistant from './components/LandingPage/AISavingsAssistant'
import BankLevelSecurity from './components/LandingPage/BankLevelSecurity'
import MicroSaveCommunity from './components/LandingPage/MicroSaveCommunity'
import WeeklySavingsChallenge from './components/LandingPage/WeeklySavingsChallenge'
import TrustedByUsers from './components/LandingPage/TrustedByUsers'
import StayUpdatedNewsletter from './components/LandingPage/NewsletterComponent'

const App = () => {
  return (
   <>

<Routes>
      <Route path="/" element={
        <div>
       <Navbar />
   <HeroSection />
   <SavingsChallenge />
   <RevolutionaryFeatures />
   <HowMicroSaveWorks />
   <SavingsPlans />
   <AISavingsAssistant />
   <BankLevelSecurity />
   <MicroSaveCommunity />
   <WeeklySavingsChallenge />
   <TrustedByUsers />
   < StayUpdatedNewsletter />
        </div>
      } /> 
    </Routes>
   
   </>
  )
}

export default App