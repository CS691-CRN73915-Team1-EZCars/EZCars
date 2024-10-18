import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/AccountSummary" element={<AccountSummary />} /> 
          <Route path="/VehicleHistory" element={<VehicleHistory />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;