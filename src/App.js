import './App.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import PartnerManagementDashboard from "./containers/PartnerManagementDashboard";

import Tabs from "./containers/AuthPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/partner" element={<PartnerManagementDashboard />} />
      </Routes>
    </BrowserRouter>

    </div>

  );
}

export default App;
