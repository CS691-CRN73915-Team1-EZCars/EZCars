import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Vehicles from "./pages/Vehicles/Vehicles";
import About from "./pages/About/About";
import Contact from "./pages/AccountSummary/AccountSummary";
import AccountSummary from "./pages/AccountSummary/AccountSummary";
import VehicleHistory from "./pages/VehicleHistory/VehicleHistory";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ModifyAccount from "./pages/ModifyAccount/ModifyAccount";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AccountSummary" element={<PrivateRoute><AccountSummary /></PrivateRoute>} />
          <Route path="/VehicleHistory" element={<PrivateRoute><VehicleHistory /></PrivateRoute>} />
          <Route path="/modify_account" element={<PrivateRoute><ModifyAccount /></PrivateRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;