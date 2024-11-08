import React, { useState, useEffect } from "react";
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
  const [minDate, setMinDate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const vehicleId = location.state?.vehicleId;

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    setMinDate(formattedToday);
    setBookingData(prev => ({ ...prev, pickUpDate: formattedToday }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(bookingData.dropOffDate) < new Date(bookingData.pickUpDate)) {
      setError("Drop-off date cannot be before the pick-up date.");
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
        pickUpDate: minDate,
        dropoffDate: minDate,
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
              min={minDate}
            />
          </label>
          <label style={styles.label}>
  
            Drop-Off Date:
            <input
              type="date"
              name="dropOffDate"
              value={bookingData.dropOffDate}
              onChange={handleChange}
              required
              style={styles.input}
              min={bookingData.pickUpDate || minDate}
              />
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