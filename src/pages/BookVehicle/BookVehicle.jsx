import React, { useState, useEffect } from "react";
import { createBooking } from "../../api/bookVehicle";
import { useLocation, useNavigate } from 'react-router-dom';
import locationData from '../../data/carData.json';
import styles from './styles';
import { getUserById } from "../../api/users";

const BookVehicle = () => {
  const [bookingData, setBookingData] = useState({
    pickUpDate: "",
    dropOffDate: "", 
    duration: "",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [minDropOffDate, setMinDropOffDate] = useState(""); 
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
    setMinDropOffDate(formattedToday); 
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await getUserById(userId);
          setUsername(user.username);
        } catch (err) {
          setError("Failed to fetch username.");
        }
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
    
    if (name === "pickUpDate") {
      const selectedPickUpDate = new Date(value);
      selectedPickUpDate.setDate(selectedPickUpDate.getDate() + 1);
      const formattedMinDropOffDate = selectedPickUpDate.toISOString().split("T")[0];
      setMinDropOffDate(formattedMinDropOffDate);
      setBookingData(prevData => ({ ...prevData, dropOffDate: formattedMinDropOffDate }));
    }

    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pickUpDateTime = new Date(bookingData.pickUpDate);
    const dropOffDateTime = new Date(bookingData.dropOffDate);

    if (dropOffDateTime <= pickUpDateTime) {
      setError("Drop-off date must be a day ahead of pick Up date!!");
      return;
    }

    const durationInDays = Math.ceil((dropOffDateTime - pickUpDateTime) / (1000 * 60 * 60 * 24));

    try {
      await createBooking({
        ...bookingData,
        userId,
        vehicleId,
        status: "PENDING",
        duration: durationInDays,
      });
      setSuccessMessage("Booking created successfully!");
      setError(null);
      setBookingData({
        pickUpDate: minDate,
        dropOffDate: minDropOffDate,
        pickupLocation: "",
        dropoffLocation: "",
      });
      setTimeout(() => {
        navigate('/VehicleHistory');
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create booking.");
      setSuccessMessage(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Book Vehicle</h1>
        {username && (
          <div style={styles.usernameBox}>
            <label style={styles.label}>Username:</label>
            <div style={styles.usernameBoxContent}>{username}</div>
          </div>
        )}
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
              min={minDropOffDate}
            />
          </label>
          <label style={styles.label}>
            Pick-Up Location:
            <select
              name="pickupLocation"
              value={bookingData.pickupLocation}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Pick-Up Location</option>
              {locationData.locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </label>
          <label style={styles.label}>
            Drop-Off Location:
            <select
              name="dropoffLocation"
              value={bookingData.dropoffLocation}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Drop-Off Location</option>
              {locationData.locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
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