import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'web3-vendor': ['ethers'],
          'ui-vendor': ['lucide-react'],
          // Landing page components
          'landing': [
            './src/components/LandingPage/Navbar',
            './src/components/LandingPage/HeroSection',
            './src/components/LandingPage/SavingsChallenge',
            './src/components/LandingPage/RevolutionaryFeatures',
            './src/components/LandingPage/HowMicroSaveWorks',
            './src/components/LandingPage/SavingsPlans'
          ],
          // Dashboard components
          'dashboard': [
            './src/components/Dashboard/NavbarDashboard',
            './src/components/Dashboard/SavingsInterface',
            './src/components/Dashboard/TransactionsTable'
          ],
          // Web3 functionality
          'web3': [
            './src/hooks/useWeb3',
            './src/hooks/useContract',
            './src/hooks/useMicroSave',
            './src/services/contractService',
            './src/config/web3',
            './src/config/contracts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
