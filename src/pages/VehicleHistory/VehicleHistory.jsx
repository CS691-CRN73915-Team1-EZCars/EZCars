import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBookingsByUserId,
  updateBookingStatus,
} from "../../api/bookVehicle";
import { getAllVehicles } from "../../api/vehicles";
import styles from "./styles";

const Summary = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showCancellationConfirmation, setShowCancellationConfirmation] =
    useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const pageSize = 10;
  const [filters, setFilters] = useState({
    status: "",
    year: "",
    month: "",
    sortDirection: "asc",
  });
  const userId = localStorage.getItem("userId");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString();
  };

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowCancellationConfirmation(true);
  };

  const confirmCancellation = async () => {
    try {
      await updateBookingStatus(bookingToCancel, "CANCELLED");
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingToCancel)
      );
      setShowCancellationConfirmation(false);
    } catch (error) {
      setShowCancellationConfirmation(false);
      console.error("Failed to cancel booking:", error);
      setError(
        "You cannot cancel booking at this moment. Cancellations are only allowed one day prior to the pickup date!!"
      );
      setShowErrorModal(true);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setError(null);
  };

  const closeCancellationConfirmation = () => {
    setShowCancellationConfirmation(false);
    setBookingToCancel(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleViewBooking = (booking) => {
    const vehicle = vehicles[booking.vehicleId];
    setSelectedBooking({ ...booking, vehicle });
    setIsModalOpen(true);
  };

  const handleModify = (booking) => {
    navigate(`/ModifyBooking`, { state: { booking } });
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  // Improved encoding function
const encodeId = (id, prefix) => {
  const paddedId = id.toString().padStart(8, '0');
  
  const substitutionMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const substitutedId = paddedId.split('').map(char => 
    substitutionMap[parseInt(char, 10) % substitutionMap.length]
  ).join('');
  
  const randomChars = Array.from({length: 4}, () => substitutionMap[Math.floor(Math.random() * substitutionMap.length)]).join('');
  const combinedString = `${randomChars}${substitutedId}`;
  const encodedString = btoa(combinedString);
  
  return `${prefix}-${encodedString}`;
};

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const bookingsResponse = await getAllBookingsByUserId(
          userId,
          filters.status,
          filters.year ? parseInt(filters.year) : undefined,
          filters.month ? parseInt(filters.month) : undefined,
          filters.sortDirection,
          currentPage,
          pageSize
        );
        setBookings(bookingsResponse.content || []);
        setTotalPages(bookingsResponse.totalPages);

        const vehiclesResponse = await getAllVehicles(0, 200);
        const allVehicles = vehiclesResponse.content || [];
        const vehicleMap = {};
        allVehicles.forEach((vehicle) => {
          vehicleMap[vehicle.vehicleId] = vehicle;
        });
        setVehicles(vehicleMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, filters, currentPage]);

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    };

    const images = importAll(
      require.context(
        "../../assets/images/vehicles",
        false,
        /\.(png|jpe?g|svg|webp|avif)$/
      )
    );

    const loadedImgs = {};
    Object.values(vehicles).forEach((vehicle) => {
      const imageName = vehicle.imageUrl.split("/").pop();
      loadedImgs[vehicle.vehicleId] = images[imageName];
    });
    setLoadedImages(loadedImgs);
  }, [vehicles]);

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

  if (isLoading) return <div style={styles.fullPageMessage}>Loading...</div>;

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Booking Summary</h2>
      <div style={styles.filterContainer}>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          style={styles.filterSelect}
        >
          <option value="">Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <div style={styles.monthYearPicker}>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            style={styles.filterSelect}
          >
            <option value="">Year</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={2024 - i}>
                {2024 - i}
              </option>
            ))}
          </select>
          <select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            style={styles.filterSelect}
          >
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <select
          name="sortDirection"
          value={filters.sortDirection}
          onChange={handleFilterChange}
          style={styles.filterSelect}
        >
          <option value="asc">Sort by Date: Oldest First</option>
          <option value="desc">Sort by Date: Newest First</option>
        </select>
      </div>
      {!bookings.length && !error && (
        <div style={styles.fullPageMessage}>
          No bookings found with the selected filters!!
        </div>
      )}
      {!Object.keys(vehicles).length && error === "No vehicles found." && (
        <div style={styles.fullPageMessage}>
          No vehicles found with the selected filters!!
        </div>
      )}
      {bookings.length > 0 && (
        <div style={styles.bookingHistory}>
          {bookings.map((booking) => {
            const vehicle = vehicles[booking.vehicleId];
            if (!vehicle) return null;
            const pickUpDateTime = new Date(booking.pickUpDate);
            const dropOffDateTime = new Date(
              pickUpDateTime.getTime() + booking.duration * 24 * 60 * 60 * 1000
            );
            return (
              <div key={booking.id} style={styles.bookingCard}>
                <div style={styles.bookingContent}>
                  <div style={styles.imageContainer}>
                    {loadedImages[vehicle.vehicleId] && (
                      <img
                        src={loadedImages[vehicle.vehicleId]}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        style={styles.vehicleImage}
                      />
                    )}
                  </div>
                  <div style={styles.vehicleInfo}>
                    <h4 style={styles.vehicleName}>
                      {vehicle.make} {vehicle.model}
                    </h4>
                    <p style={styles.vehicleDetail}>
                      <span style={styles.label}>Year:</span> {vehicle.year}
                    </p>
                    <p style={styles.vehicleDetail}>
                      <span style={styles.label}>Transmission:</span>{" "}
                      {vehicle.transmission}
                    </p>
                    <p style={styles.vehicleDetail}>
                      <span style={styles.label}>Fuel Type:</span>{" "}
                      {vehicle.fuelType}
                    </p>
                    <p style={styles.vehicleDetail}>
                      <span style={styles.label}>Mileage:</span>{" "}
                      {vehicle.mileage} mpg
                    </p>
                    <p style={styles.bookingPrice}>
                      <span style={styles.label}>Booking Price:</span> $
                      {(vehicle.price * booking.duration).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div style={styles.bookingDetails}>
                  <div style={styles.bookingColumn}>
                    <p style={styles.bookingDetail}>
                      <span style={styles.label}>Pick-up Location:</span>{" "}
                      {booking.pickupLocation}
                    </p>
                    <p style={styles.bookingDetail}>
                      <span style={styles.label}>Pick-up Date:</span>{" "}
                      {formatDate(booking.pickUpDate)}
                    </p>
                  </div>
                  <div style={styles.bookingColumn}>
                    <p style={styles.bookingDetail}>
                      <span style={styles.label}>Drop-off Location:</span>{" "}
                      {booking.dropoffLocation}
                    </p>
                    <p style={styles.bookingDetail}>
                      <span style={styles.label}>Drop-off Date:</span>{" "}
                      {formatDate(dropOffDateTime)}
                    </p>
                  </div>
                  <div style={styles.bookingStatusRow}>
                    <p style={styles.bookingStatus}>
                      <span style={styles.label}>Status:</span>{" "}
                      <span
                        style={{
                          ...styles.statusText,
                          color:
                            booking.status.toLowerCase() === "completed"
                              ? "green"
                              : booking.status.toLowerCase() === "pending"
                              ? "red"
                              : booking.status.toLowerCase() === "confirmed"
                              ? "blue"
                              : booking.status.toLowerCase() === "cancelled"
                              ? "gray"
                              : "black",
                        }}
                      >
                        {booking.status}
                      </span>
                    </p>
                    <p style={styles.bookingDuration}>
                      <span style={styles.label}>Duration:</span>{" "}
                      {booking.duration} day(s)
                    </p>
                  </div>
                  <div style={styles.buttonContainer}>
                    {booking.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleModify(booking)}
                        style={styles.modifyBookingButton}
                      >
                        Modify
                      </button>
                    )}
                    <button
                      onClick={() => handleViewBooking(booking)}
                      style={styles.viewBookingButton}
                    >
                      View Booking
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      style={{
                        ...styles.deleteButton,
                        opacity: booking.status === "CANCELLED" ? 0.5 : 1,
                        cursor:
                          booking.status === "CANCELLED"
                            ? "not-allowed"
                            : "pointer",
                      }}
                      disabled={booking.status === "CANCELLED"}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isModalOpen && selectedBooking && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Booking Details</h3>
            <div style={styles.modalBody}>
              <div style={styles.modalImageContainer}>
                {loadedImages[selectedBooking.vehicle.vehicleId] && (
                  <img
                    src={loadedImages[selectedBooking.vehicle.vehicleId]}
                    alt={`${selectedBooking.vehicle.make} ${selectedBooking.vehicle.model}`}
                    style={styles.modalVehicleImage}
                  />
                )}
              </div>
              <div style={styles.modalInfo}>
                <h4 style={styles.modalVehicleName}>
                  {selectedBooking.vehicle.make} {selectedBooking.vehicle.model}
                </h4>
                <p>
                  <span style={styles.label}>Year:</span>{" "}
                  {selectedBooking.vehicle.year}
                </p>
                <p>
                  <span style={styles.label}>Transmission:</span>{" "}
                  {selectedBooking.vehicle.transmission}
                </p>
                <p>
                  <span style={styles.label}>Fuel Type:</span>{" "}
                  {selectedBooking.vehicle.fuelType}
                </p>
                <p>
                  <span style={styles.label}>Mileage:</span>{" "}
                  {selectedBooking.vehicle.mileage} mpg
                </p>
                <p>
                  <span style={styles.label}>Booking ID:</span>{" "}
                {encodeId(selectedBooking.id, 'EZ')}
                </p>
                <p>
                  <span style={styles.label}>Pick-up Location:</span>{" "}
                  {selectedBooking.pickupLocation}
                </p>
                <p>
                  <span style={styles.label}>Pick-up Date:</span>{" "}
                  {formatDate(selectedBooking.pickUpDate)}
                </p>
                <p>
                  <span style={styles.label}>Drop-off Location:</span>{" "}
                  {selectedBooking.dropoffLocation}
                </p>
                <p>
                  <span style={styles.label}>Drop-off Date:</span>{" "}
                  {formatDate(
                    new Date(
                      new Date(selectedBooking.pickUpDate).getTime() +
                        selectedBooking.duration * 24 * 60 * 60 * 1000
                    )
                  )}
                </p>
                <p>
                  <span style={styles.label}>Status:</span>{" "}
                  <span
                        style={{
                          ...styles.statusText,
                          color:
                            selectedBooking.status.toLowerCase() === "completed"
                              ? "green"
                              : selectedBooking.status.toLowerCase() === "pending"
                              ? "red"
                              : selectedBooking.status.toLowerCase() === "confirmed"
                              ? "blue"
                              : selectedBooking.status.toLowerCase() === "cancelled"
                              ? "gray"
                              : "black",
                        }}
                      >
                        {selectedBooking.status}
                      </span>
                </p>
                <p>
                  <span style={styles.label}>Duration:</span>{" "}
                  {selectedBooking.duration} day(s)
                </p>
                <p>
                  <span style={styles.label}>Booking Price:</span> $
                  {(
                    selectedBooking.vehicle.price * selectedBooking.duration
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            <button onClick={handleCloseModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
      {showCancellationConfirmation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Confirm Cancellation</h3>
            <p style={styles.confirmMessage}>
              Are you sure you want to cancel this booking?
            </p>
            <div style={styles.buttonContainer}>
              <button
                onClick={confirmCancellation}
                style={styles.confirmButton}
              >
                Yes, Cancel Booking
              </button>
              <button
                onClick={closeCancellationConfirmation}
                style={styles.cancelButton}
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Alert</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button onClick={closeErrorModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
      {bookings.length > 0 && totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            style={styles.paginationButton}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
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

export default Summary;
