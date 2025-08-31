
import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router";

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIDashboard = lazy(() => import('./pages/AIDashboard'));

const App = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ai-dashboard" element={<AIDashboard />} />
      </Routes>
    </Suspense>
  )
}

export default App