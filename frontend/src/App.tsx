import { BrowserRouter as Router } from "react-router-dom";
import { Web3Provider } from "./web3/web3Config";

import { Navbar } from "./pages/components/Navbar";

import { PageRoutes } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Web3Provider>
          <Navbar/>
          <PageRoutes />
        </Web3Provider>
      </Router>
    </>
  );
}

export default App;
