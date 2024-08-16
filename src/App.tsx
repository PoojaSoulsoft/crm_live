import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check for authentication

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
          }
        />
         <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
