import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { WalletProvider } from "./shared/components/walletContext";
import { Web3Provider } from "./web3/web3Config";

import { Navbar } from "./pages/components/Navbar";

import { PageRoutes } from "./pages";


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

function AppContent() {
  return (
    <>
      <Navbar />
      <PageRoutes />
      <Footer />
    </>
  );
}

export default App;

const Footer = styled.div`
  height: 50px;
`