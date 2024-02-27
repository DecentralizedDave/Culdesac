import { BrowserRouter as Router } from "react-router-dom";
import { WalletProvider } from "./shared/components/walletContext";
import { Web3Provider } from "./web3/web3Config";

import { Navbar } from "./pages/components/Navbar";

import { PageRoutes } from "./pages";

// This is your main App component that sets up providers
function App() {
  return (
    <Router>
      <Web3Provider>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </Web3Provider>
    </Router>
  );
}

// This component is responsible for rendering the app content and using the useWallet hook
function AppContent() {
  return (
    <>
      <Navbar />
      <PageRoutes />
    </>
  );
}

export default App;