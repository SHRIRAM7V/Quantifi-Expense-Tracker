import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

import Dashboard from "./pages/DashBoard/Dashboard";
import Auth from "./pages/Auth/Auth";

import { FinancialContextProvider } from "./context/financial-record-context";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialContextProvider>
                <Dashboard />
              </FinancialContextProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
