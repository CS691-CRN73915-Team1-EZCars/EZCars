import React, { useState, useEffect } from "react";
import { getAllRatingsByVehicleId } from "../../api/rating";
import { getVehicleById } from "../../api/vehicles";
import { useParams } from "react-router-dom";
import styles from "./styles";

const Rating = () => {
  const { vehicleId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [vehicle, setVehicle] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortDirection, setSortDirection] = useState('desc');
  const [ratingFilter, setRatingFilter] = useState('all');
  const pageSize = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const generateStarRating = (rating) => {
    const fullStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return fullStars + emptyStars;
  };

  useEffect(() => {
    const fetchRatingsAndVehicle = async () => {
      setIsLoading(true);
      try {
        // Fetch vehicle details
        const vehicleResponse = await getVehicleById(vehicleId);
        if (vehicleResponse) {
          setVehicle(vehicleResponse);
        } else {
          throw new Error("Invalid vehicle response format");
        }

        // Fetch ratings
        const ratingsResponse = await getAllRatingsByVehicleId(
          vehicleId,
          currentPage,
          pageSize,
          'rating',
          sortDirection
        );

        if (ratingsResponse && ratingsResponse.content && Array.isArray(ratingsResponse.content)) {
          let filteredRatings = ratingsResponse.content;
          if (ratingFilter !== 'all') {
            filteredRatings = filteredRatings.filter(rating => Math.floor(rating.rating) === parseInt(ratingFilter));
          }
          setRatings(filteredRatings);
          setTotalPages(ratingsResponse.totalPages);
        } else {
          throw new Error("Invalid ratings response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (vehicleId) {
      fetchRatingsAndVehicle();
    } else {
      setError("No vehicle ID provided.");
      setIsLoading(false);
    }
  }, [vehicleId, currentPage, sortDirection, ratingFilter]);

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

  const handleSortChange = (event) => {
    setSortDirection(event.target.value);
    setCurrentPage(0);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
    setCurrentPage(0);
  };

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Rating And Reviews</h2>
      
      {vehicle && (
        <div style={styles.vehicleInfo}>
          <h3>{`${vehicle.make} ${vehicle.model}`}</h3>
        </div>
      )}

      <div style={styles.filterContainer}>
        <label htmlFor="rating-filter" style={styles.filterLabel}>Filter by rating: </label>
        <select id="rating-filter" value={ratingFilter} onChange={handleRatingFilterChange} style={styles.filterSelect}>
          <option value="all">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ </option>
          <option value="4">⭐⭐⭐⭐ </option>
          <option value="3">⭐⭐⭐ </option>
          <option value="2">⭐⭐ </option>
          <option value="1">⭐ </option>
        </select>
        <label htmlFor="sort-select">Sort by rating: </label>
        <select id="sort-select" value={sortDirection} onChange={handleSortChange} style={styles.sortSelect}>
          <option value="desc">High to Low</option>
          <option value="asc">Low to High</option>
        </select>
      </div>

      {error && <div style={styles.fullPageMessage}>{error}</div>}
      
      {ratings.length === 0 ? (
        <div style={styles.fullPageMessage}>No ratings found.</div>
      ) : (
        <div style={styles.bookingHistory}>
          {ratings.map((rating) => (
            <div key={rating.ratingId} style={styles.bookingCard}>
              <div style={styles.cardHeader}>
                <h4 style={styles.userName}>Name: {rating.userName}</h4>
                <p style={styles.createdDate}>{formatDate(rating.createdAt)}</p>
              </div>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Rating:</span>
                <span style={styles.starRating}>
                  {generateStarRating(rating.rating)}
                </span>
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Review:</span> {rating.review}
              </p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            style={styles.paginationButton}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>
            {" "}
            Page {currentPage + 1} of {totalPages}{" "}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            style={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Rating;