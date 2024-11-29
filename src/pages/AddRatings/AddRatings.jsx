import React, { useState, useEffect } from "react";
import styles from "./styles";

const AddRatings = () => {
  const [username, setUsername] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch("/api/username")
      .then((response) => response.json())
      .then((data) => setUsername(data.username))
      .catch((error) => console.error("Error fetching username:", error));

    // Fetch vehicle data
    fetch("/api/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { username, vehicle, rating, review };
    
    // API call to submit review
    fetch("/api/addReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Review submitted successfully!");
        setVehicle("");
        setRating(0);
        setReview("");
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add Review & Ratings</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>User:</label>
          <input type="text" value={username} readOnly style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Vehicle:</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
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
    </div>
  );
};

export default AddRatings;
