import React, { useState, useEffect } from 'react';
import { getAllBookingsByUserId, deleteBooking } from '../../api/bookVehicle'; 
import { getAllVehicles } from '../../api/vehicles';
import styles from './styles';

const Summary = () => {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString();
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking:', error);
      setError('Failed to delete booking. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch bookings
        const bookingsResponse = await getAllBookingsByUserId(userId);
        console.log('bookingsResponse', bookingsResponse);
        
        // Sort bookings in reverse chronological order
        const sortedBookings = bookingsResponse.sort((a, b) => 
          new Date(b.pickUpDate) - new Date(a.pickUpDate)
        );
        
        setBookings(sortedBookings || []);

        // Fetch all vehicles
        const vehiclesResponse = await getAllVehicles(0, 200);
        const allVehicles = vehiclesResponse.content || [];

        // Create a map of vehicle ID to vehicle data
        const vehicleMap = {};
        allVehicles.forEach(vehicle => {
          vehicleMap[vehicle.vehicleId] = vehicle;
        });

        setVehicles(vehicleMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images;
    };
    
    const images = importAll(require.context('../../assets/images/vehicles', false, /\.(png|jpe?g|svg|webp|avif)$/));
    
    const loadedImgs = {};
    Object.values(vehicles).forEach(vehicle => {
      const imageName = vehicle.imageUrl.split('/').pop();
      loadedImgs[vehicle.vehicleId] = images[imageName];
    });

    setLoadedImages(loadedImgs);
  }, [vehicles]);

  if (isLoading) return <div style={styles.fullPageMessage}>Loading...</div>;
  
  // Check if there are no bookings or no vehicles
  if (!bookings.length || Object.keys(vehicles).length === 0) {
    return <div style={styles.fullPageMessage}>No booking history!!</div>;
  }

  // If there's an error and we have no data, show the error
  if (error && !bookings.length && Object.keys(vehicles).length === 0) {
    return <div style={styles.fullPageMessage}>{error}</div>;
  }

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Booking Summary</h2>
      
      <div style={styles.bookingHistory}>
        {bookings.map((booking) => {
          const vehicle = vehicles[booking.vehicleId];
          if (!vehicle) return null;

          // Calculate drop-off date based on duration in days
          const pickUpDateTime = new Date(booking.pickUpDate);
          // Calculate drop-off date by adding duration in days
          const dropOffDateTime = new Date(pickUpDateTime.getTime() + booking.duration * 24 * 60 * 60 * 1000);

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
                  <h4 style={styles.vehicleName}>{vehicle.make} {vehicle.model}</h4>
                  <p style={styles.vehicleDetail}><span style={styles.label}>Year:</span> {vehicle.year}</p>
                  <p style={styles.vehicleDetail}><span style={styles.label}>Transmission:</span> {vehicle.transmission}</p>
                  <p style={styles.vehicleDetail}><span style={styles.label}>Fuel Type:</span> {vehicle.fuelType}</p>
                  <p style={styles.vehicleDetail}><span style={styles.label}>Price:</span> ${vehicle.price}/day</p>
                  <p style={styles.vehicleDetail}><span style={styles.label}>Mileage:</span> {vehicle.mileage} mpg</p>
                </div>
              </div>
              <div style={styles.bookingDetails}>
                <div style={styles.bookingColumn}>
                  <p style={styles.bookingDetail}><span style={styles.label}>Pick-up Location:</span> {booking.pickupLocation}</p>
                  <p style={styles.bookingDetail}>
                    <span style={styles.label}>Pick-up Date:</span> {formatDate(booking.pickUpDate)}
                  </p>
                </div>
                <div style={styles.bookingColumn}>
                  <p style={styles.bookingDetail}><span style={styles.label}>Drop-off Location:</span> {booking.dropoffLocation}</p>
                  <p style={styles.bookingDetail}>
                    <span style={styles.label}>Drop-off Date:</span> {formatDate(dropOffDateTime)}
                  </p>
                </div>
                <div style={styles.bookingStatusRow}>
                  <p style={styles.bookingDuration}><span style={styles.label}>Duration:</span> {booking.duration} days</p>
                  <p style={styles.bookingStatus}><span style={styles.label}>Status:</span> {booking.status}</p>
                </div>
                <button onClick={() => handleDeleteBooking(booking.id)} style={styles.deleteButton}>
                  Delete Booking
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;