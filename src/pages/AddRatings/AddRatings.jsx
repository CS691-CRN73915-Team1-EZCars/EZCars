import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useLocation, useNavigate } from 'react-router-dom';
import { createRating } from '../../api/rating';
import { getVehicleById } from "../../api/vehicles";
import { getBookingById } from "../../api/bookVehicle";

const AddRatings = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [vehicle, setVehicle] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');
  const bookingId = new URLSearchParams(location.search).get('BookingId');

  useEffect(() => {
    const fetchBookingAndVehicleDetails = async () => {
      try {
        const bookingResponse = await getBookingById(bookingId);
        if (bookingResponse && bookingResponse.vehicleId) {
          const vehicleResponse = await getVehicleById(bookingResponse.vehicleId);
          if (vehicleResponse) {
            setVehicle(vehicleResponse); 
          } else {
            throw new Error("Invalid vehicle response format");
          }
        } else {
          throw new Error("Invalid booking response format");
        }
      } catch (error) {
        console.error("Error fetching booking or vehicle details:", error);
        setModalContent({ title: "Error", message: "Failed to fetch vehicle details." });
        setShowModal(true);
      }
    };

    fetchBookingAndVehicleDetails();

    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername) setUsername(storedUsername);
    if (storedUserId) setUserId(storedUserId);
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ratingData = { rating, review, userId };
    
    try {
      await createRating(ratingData, token);
      setModalContent({ title: "Success", message: "Review submitted successfully!" });
      setShowModal(true);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setModalContent({ title: "Error", message: `Failed to submit review. Error: ${error.message}` });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent.title === "Success") {
      navigate('/');
    }
  };

  const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={onClose} style={styles.button}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add Review & Ratings</h2>
      {username && <p style={styles.username}>Welcome, {username}!</p>}
      
      {vehicle && (
        <div style={styles.vehicleInfo}>
          <h3>{`Your review for ${vehicle.make} ${vehicle.model}`}</h3>
        </div>
      )}

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Rating:</label>
          <div style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={rating >= star ? styles.starFilled : styles.star}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit Review
        </button>
      </form>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalContent.title}
        content={modalContent.message}
      />
    </div>
  );
};

export default AddRatings;