import React from 'react'
import Navbar  from './components/Navbar'
import HeroSection from './components/HeroSection'
import SavingsChallenge from './components/SavingsChallenge'
import RevolutionaryFeatures from './components/RevolutionaryFeatures'
import HowMicroSaveWorks from './components/HowMicroSaveWorks'
import SavingsPlans from './components/SavingsPlans'
import AISavingsAssistant from './components/AISavingsAssistant'
import BankLevelSecurity from './components/BankLevelSecurity'
import MicroSaveCommunity from './components/MicroSaveCommunity'
import WeeklySavingsChallenge from './components/WeeklySavingsChallenge'
import TrustedByUsers from './components/TrustedByUsers'
import StayUpdatedNewsletter from './components/NewsletterComponent'

const App = () => {
  return (
   <>
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
   </>
  )
}

export default App