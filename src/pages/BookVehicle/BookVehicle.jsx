import React, { useState } from "react";
import { createBooking } from "../../api/bookVehicle";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles';

const BookVehicle = () => {
  const [bookingData, setBookingData] = useState({
    pickUpDate: "",
    duration: "12",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const vehicleId = location.state?.vehicleId;

  const today = new Date().toISOString().split('T')[0];

  const isDateValid = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pickUpDate' && !isDateValid(value)) {
      setError("Pick-up date cannot be in the past.");
      return;
    }
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDateValid(bookingData.pickUpDate)) {
      setError("Pick-up date cannot be in the past.");
      return;
    }
    try {
      await createBooking({
        ...bookingData,
        userId,
        vehicleId,
        status: "PENDING",
      });
      setSuccessMessage("Booking created successfully!");
      setError(null);
      setBookingData({
        pickUpDate: "",
        duration: "12",
        pickupLocation: "",
        dropoffLocation: "",
      });
      // Redirect to booking history page after a short delay
      setTimeout(() => {
        navigate('/VehicleHistory');
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError(err.message || "Failed to create booking.");
      setSuccessMessage(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Book Vehicle</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Pick-Up Date:
            <input
              type="date"
              name="pickUpDate"
              value={bookingData.pickUpDate}
              onChange={handleChange}
              required
              style={styles.input}
              min={today}
            />
          </label>
          <label style={styles.label}>
            Duration:
            <select
              name="duration"
              value={bookingData.duration}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="12">12 hrs</option>
              <option value="24">24 hrs</option>
              <option value="48">48 hrs</option>
              <option value="72">72 hrs</option>
              <option value="96">96 hrs</option>
            </select>
          </label>
          <label style={styles.label}>
            Pick-Up Location:
            <input
              type="text"
              name="pickupLocation"
              value={bookingData.pickupLocation}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Drop-Off Location:
            <input
              type="text"
              name="dropoffLocation"
              value={bookingData.dropoffLocation}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Submit Booking</button>
        </form>

        {successMessage && (
          <div style={styles.success}>{successMessage}</div>
        )}
        {error && (
          <div style={styles.error}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default BookVehicle;