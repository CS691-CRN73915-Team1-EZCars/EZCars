import React, { useState, useEffect } from "react";
import { getAllRatingsByVehicleId } from "../../api/rating";
import { useParams } from "react-router-dom"; // Import useParams to get vehicleId
import styles from "./styles";

const Rating = () => {
    const { vehicleId } = useParams(); // Get vehicleId from URL parameters
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        const fetchRatings = async () => {
            setIsLoading(true);
            try {
                console.log(`Fetching ratings for vehicle ID: ${vehicleId}`); // Debugging log
                const response = await getAllRatingsByVehicleId(vehicleId);
                console.log("Response from API:", response); // Debugging log
                if (response && Array.isArray(response)) {
                    setRatings(response);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching ratings:", error);
                setError("Failed to fetch ratings. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (vehicleId) {
            fetchRatings();
        } else {
            setError("No vehicle ID provided.");
            setIsLoading(false);
        }
    }, [vehicleId]); // Fetch ratings when vehicleId changes

    if (isLoading) return <div style={styles.fullPageMessage}>Loading...</div>;

    return (
        <div style={styles.summaryContainer}>
            <h2 style={styles.heading}>Vehicle Rating And Reviews</h2>
            {error && <div style={styles.fullPageMessage}>{error}</div>}
            {ratings.length === 0 ? (
                <div style={styles.fullPageMessage}>No ratings found.</div>
            ) : (
                <div style={styles.bookingHistory}>
                    {ratings.map((rating) => (
                        <div key={rating.ratingId} style={styles.bookingCard}>
                            <h4 style={styles.userName}> Name: {rating.userName}</h4>
                            <p style={styles.bookingDetail}>
                                <span style={styles.label}>Rating:</span> {rating.rating} / 5
                            </p>
                            <p style={styles.bookingDetail}>
                                <span style={styles.label}>Review:</span> {rating.review}
                            </p>
                            <p style={styles.bookingDetail}>
                                <span style={styles.label}>Created At:</span> {formatDate(rating.createdAt)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rating;