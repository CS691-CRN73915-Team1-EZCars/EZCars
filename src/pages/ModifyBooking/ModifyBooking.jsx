import React, { useState, useEffect } from "react";
import { updateBooking, getBookingById, updateBookingStatus } from "../../api/bookVehicle";
import { useLocation, useNavigate } from "react-router-dom";
import locationData from "../../data/carData.json";
import styles from "./styles";
import { getUserById } from "../../api/users";
import { getVehicleById } from "../../api/vehicles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "../../components/Payment/StripePayment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHER_KEY);

const ModifyBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [bookingData, setBookingData] = useState(() => {
    const pickUpDate = booking?.pickUpDate || "";
    const duration = booking?.duration || "";
    let dropOffDate = "";
  
    if (pickUpDate && duration) {
      const pickUpDateTime = new Date(pickUpDate);
      pickUpDateTime.setDate(pickUpDateTime.getDate() + parseInt(duration));
      dropOffDate = pickUpDateTime.toISOString().split('T')[0];
    }
  
    return {
      pickUpDate,
      duration,
      dropOffDate,
      pickupLocation: booking?.pickupLocation || "",
      dropoffLocation: booking?.dropoffLocation || "",
    };
  });
  
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [minDropOffDate, setMinDropOffDate] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [fetchedBookingData, setFetchedBookingData] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const userId = localStorage.getItem("userId");
  const vehicleId = booking?.vehicleId;

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setMinDate(formattedToday);
    setMinDropOffDate(formattedToday);

    if (booking) {
      setBookingData({
        pickUpDate: booking.pickUpDate,
        dropOffDate: booking.dropOffDate,
        duration: booking.duration,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
      });
    }
  }, [booking]);

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
      selectedPickUpDate.setDate(selectedPickUpDate.getDate() + booking.duration);
      const formattedMinDropOffDate = selectedPickUpDate
        .toISOString()
        .split("T")[0];
      setMinDropOffDate(formattedMinDropOffDate);
      setBookingData((prevData) => ({
        ...prevData,
        dropOffDate: formattedMinDropOffDate,
      }));
    }
    setError(null);
  };

  const fetchVehicleDetails = async (vehicleId) => {
    try {
      return await getVehicleById(vehicleId);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      return null;
    }
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    const pickUpDateTime = new Date(bookingData.pickUpDate);
    const dropOffDateTime = new Date(bookingData.dropOffDate);
    if (dropOffDateTime <= pickUpDateTime) {
      setError("Drop-off date must be a day ahead of pick Up date!!");
      return;
    }
    const durationInDays = Math.ceil(
      (dropOffDateTime - pickUpDateTime) / (1000 * 60 * 60 * 24)
    );
    try {
      const vehicleDetailsFetched = await fetchVehicleDetails(vehicleId);
      if (vehicleDetailsFetched) {
        setVehicleDetails(vehicleDetailsFetched);
        if (durationInDays !== booking.duration) {
          const totalPrice = ((vehicleDetailsFetched.price * durationInDays) - (vehicleDetailsFetched.price * booking.duration));
          setTotalAmount(totalPrice);
          setShowPaymentForm(true);
        } else {
            await updateBookingStatus(booking.id, 'CONFIRMED');
            await handleUpdateBooking();
        }
      } else {
        throw new Error("Failed to fetch vehicle details.");
      }
    } catch (err) {
      setError(err.message || "Failed to process booking.");
    }
  };

  const handleModifyBooking = async () => {
    try {
      const pickUpDateTime = new Date(bookingData.pickUpDate);
      const dropOffDateTime = new Date(bookingData.dropOffDate);
      const durationInDays = Math.ceil(
        (dropOffDateTime - pickUpDateTime) / (1000 * 60 * 60 * 24)
      );

        await updateBooking(booking.id,{
            ...bookingData,
            status: "PENDING",
            duration: durationInDays
          });
      const bookingDetailsFetched = await getBookingById(booking.id);
      if (bookingDetailsFetched) {
        setFetchedBookingData(bookingDetailsFetched);
        setSuccessMessage("Booking Modified successfully!");
        setError(null);
      } else {
        throw new Error("Failed to fetch booking details.");
    }
    } catch (err) {
      setError(err.message || "Failed to modify booking.");
      setSuccessMessage(null);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      if (!booking.id) {
        throw new Error("Booking ID not found.");
      }
      await updateBookingStatus(booking.id, 'CONFIRMED');
      console.log('Booking Modified successfully!');
      setShowConfirmationPopup(true);
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError(error.message || "Failed to update booking status.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Modify Vehicle</h1>
        {username && (
          <div style={styles.usernameBox}>
            <label style={styles.label}>Username:</label>
            <div style={styles.usernameBoxContent}>{username}</div>
          </div>
        )}
        {!showPaymentForm ? (
          <form onSubmit={handleProceedToPayment} style={styles.form}>
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
                  <option key={index} value={loc}>
                    {loc}
                  </option>
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
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              style={styles.button}
              onClick={handleModifyBooking}
            >
              Proceed to Update
            </button>
          </form>
        ) : (
          <div style={styles.paymentContainer}>
            <h2>Payment Details</h2>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <Elements stripe={stripePromise}>
              <StripePayment
                amount={totalAmount}
                bookingId={booking.id}
                onPaymentSuccess={handleUpdateBooking}
              />
            </Elements>
          </div>
        )}
        {successMessage && <div style={styles.success}>{successMessage}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
      {showConfirmationPopup && fetchedBookingData && vehicleDetails && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupHeading}>Booking Status</h2>
            <p>
              Your booking is processed. We will soon confirm your booking and you will receive updates through email.
            </p>
            <h3>Booking Details:</h3>
            <p>Pick-up Date: {fetchedBookingData.pickUpDate}</p>
            <p>Pick-up Location: {fetchedBookingData.pickupLocation}</p>
            <p>Drop-off Location: {fetchedBookingData.dropoffLocation}</p>
            <h3>Vehicle Details:</h3>
            <p>Make: {vehicleDetails.make}</p>
            <p>Model: {vehicleDetails.model}</p>
            <p>Year: {vehicleDetails.year}</p>
            <p>
              Booking Price: $
              {(vehicleDetails.price * fetchedBookingData.duration).toFixed(2)}
            </p>
            <button
              style={styles.button}
              onClick={() => {
                setShowConfirmationPopup(false);
                navigate("/VehicleHistory");
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyBooking;