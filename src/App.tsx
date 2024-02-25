import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

  import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProtectedDashboard from "./components/ProtectedDashboard";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/protected" element={<ProtectedDashboard />} />
        </Routes>
      </Router>
  )
}

export default App