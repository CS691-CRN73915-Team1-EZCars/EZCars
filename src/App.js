import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Vehicles from "./pages/Vehicles/Vehicles";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AccountSummary from "./pages/AccountSummary/AccountSummary";
import VehicleHistory from "./pages/VehicleHistory/VehicleHistory";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CustomerSupport from "./pages/CustomerSupport/CustomerSupport";
import ModifyAccount from "./pages/ModifyAccount/ModifyAccount";
import BookVehicle from "./pages/BookVehicle/BookVehicle";
import ModifyBooking from "./pages/ModifyBooking/ModifyBooking";
import Rating from "./pages/Rating/Rating";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import NotFound from './pages/NotFound/NotFound';
import AddRatings from "./pages/AddRatings/AddRatings";
import { isTokenExpired } from './api/auth';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && !isTokenExpired(token);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          {/* Private routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/AccountSummary" element={<PrivateRoute><AccountSummary /></PrivateRoute>} />
          <Route path="/VehicleHistory" element={<PrivateRoute><VehicleHistory /></PrivateRoute>} />
          <Route path="/ModifyAccount" element={<PrivateRoute><ModifyAccount /></PrivateRoute>} />
          <Route path="/CustomerSupport" element={<PrivateRoute><CustomerSupport /></PrivateRoute>} />
          <Route path="/BookVehicle" element={<PrivateRoute><BookVehicle /></PrivateRoute>} />
          <Route path="/ModifyBooking" element={<PrivateRoute><ModifyBooking /></PrivateRoute>} />
          <Route path="/VehicleRating/:vehicleId" element={<PrivateRoute><Rating /></PrivateRoute>} />
          <Route path="/PaymentHistory" element={<PrivateRoute><PaymentHistory /></PrivateRoute>} />
          <Route path="/AddRating" element={<PrivateRoute><AddRatings /></PrivateRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
