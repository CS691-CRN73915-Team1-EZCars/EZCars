import React, { useState, useEffect } from "react";
import { getAllRatingsByVehicleId } from "../../api/rating";
import { useParams } from "react-router-dom";
import styles from "./styles";

const Rating = () => {
    const { vehicleId } = useParams(); 
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10; 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        const fetchRatings = async () => {
            setIsLoading(true);
            try {
                const response = await getAllRatingsByVehicleId(vehicleId, currentPage, pageSize);
                
                if (response && response.content && Array.isArray(response.content)) {
                    setRatings(response.content); 
                    setTotalPages(response.totalPages); 
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
    }, [vehicleId, currentPage]);

    if (isLoading) return <div style={styles.fullPageMessage}>Loading...</div>;

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                            <h4 style={styles.userName}>Name: {rating.userName}</h4>
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
            {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 0} style={styles.paginationButton}>
                        Previous
                    </button>
                    <span style={styles.pageInfo}> Page {currentPage + 1} of {totalPages} </span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={styles.paginationButton}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Rating;