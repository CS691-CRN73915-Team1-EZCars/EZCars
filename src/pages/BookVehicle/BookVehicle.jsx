import React, { useState, useEffect } from "react";
import { createBooking, getBookingById } from "../../api/bookVehicle";
import { useLocation, useNavigate } from 'react-router-dom';
import locationData from '../../data/carData.json';
import styles from './styles';
import { getUserById } from "../../api/users";
import { getVehicleById } from "../../api/vehicles";

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
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [fetchedBookingData, setFetchedBookingData] = useState(null); // State for fetched booking data
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const vehicleId = location.state?.vehicleId;

  // Set minimum dates on component mount
  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setMinDate(formattedToday);
    setBookingData(prev => ({ ...prev, pickUpDate: formattedToday }));
    setMinDropOffDate(formattedToday); 
  }, []);

  // Fetch username
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevData => ({ ...prevData, [name]: value }));
    
    if (name === "pickUpDate") {
      const selectedPickUpDate = new Date(value);
      selectedPickUpDate.setDate(selectedPickUpDate.getDate() + 1);
      const formattedMinDropOffDate = selectedPickUpDate.toISOString().split("T")[0];
      setMinDropOffDate(formattedMinDropOffDate);
      setBookingData(prevData => ({ ...prevData, dropOffDate: formattedMinDropOffDate }));
    }

    setError(null);
  };

  // Fetch vehicle details
  const fetchVehicleDetails = async (vehicleId) => {
    try {
      return await getVehicleById(vehicleId); // Return vehicle details
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      return null; // Return null on error
    }
  };

  // Handle form submission
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
      // Create booking and get the booking ID
      const createdBookingResponse = await createBooking({
        ...bookingData,
        userId,
        vehicleId,
        status: "PENDING",
        duration: durationInDays,
      });

      // Assuming createBooking returns the ID of the created booking
      const bookingId = createdBookingResponse.id; 

      // Fetch vehicle details before showing popup
      const vehicleDetailsFetched = await fetchVehicleDetails(vehicleId);

      if (vehicleDetailsFetched) {
        setVehicleDetails(vehicleDetailsFetched); // Set vehicle details

        // Fetch the newly created booking data using its ID
        const bookingDetailsFetched = await getBookingById(bookingId);
        if (bookingDetailsFetched) {
          setFetchedBookingData(bookingDetailsFetched); // Set fetched booking data for display
          setShowConfirmationPopup(true); // Show popup only after fetching
          setSuccessMessage("Booking created successfully!");
          setError(null);

          // Reset form data
          setBookingData({
            pickUpDate: minDate,
            dropOffDate: minDropOffDate,
            pickupLocation: "",
            dropoffLocation: "",
          });
        } else {
          throw new Error("Failed to fetch booking details.");
        }
      } else {
        throw new Error("Failed to fetch vehicle details.");
      }
      
    } catch (err) {
      console.error('Error in booking submission:', err); // Debugging
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

      {/* Confirmation Popup */}
      {showConfirmationPopup && fetchedBookingData && vehicleDetails && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupHeading}>Booking Status</h2>
            <p>Your booking is processed. We will soon confirm your booking and you will receive updates through email.</p>
            <h3>Booking Details:</h3>
            {/* Displaying Booking Data */}
            <p>Pick-up Date: {fetchedBookingData.pickUpDate}</p>
            <p>Pick-up Location: {fetchedBookingData.pickupLocation}</p>
            <p>Drop-off Location: {fetchedBookingData.dropoffLocation}</p>

            {/* Displaying Vehicle Details */}
            {vehicleDetails ? (
              <>
                <h3>Vehicle Details:</h3>
                <p>Make: {vehicleDetails.make}</p>
                <p>Model: {vehicleDetails.model}</p>
                <p>Year: {vehicleDetails.year}</p>
                <p>Booking Price: ${(vehicleDetails.price * fetchedBookingData.duration).toFixed(2)}</p>
              </>
            ) : (
              <p>No vehicle details available.</p> // Fallback message if no details are fetched.
            )}

            {/* Done button to navigate to Vehicle History */}
            <button 
              onClick={() => {
                setShowConfirmationPopup(false); 
                navigate('/VehicleHistory');
              }} 
              style={{ ...styles.button, marginTop: '20px' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookVehicle;