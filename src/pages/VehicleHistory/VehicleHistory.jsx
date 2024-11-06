import React, { useState, useEffect } from 'react';
import { getAllBookingsByUserId } from '../../api/bookVehicle'; 
import { getAllVehicles } from '../../api/vehicles';
import styles from './styles';

const Summary = () => {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);

  const userId = localStorage.getItem('userId');

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
        // Instead of setting an error state, we'll just set vehicles to an empty object
        setVehicles({});
      } finally {
        setVehiclesLoaded(true);
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
  if (vehiclesLoaded && Object.keys(vehicles).length === 0) {
    return <div style={styles.fullPageMessage}>No vehicles to show!!</div>;
  }
  if (!bookings || bookings.length === 0) return <div style={styles.fullPageMessage}>No bookings found</div>;

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Booking Summary</h2>
      
      <div style={styles.bookingHistory}>
        {bookings.map((booking) => {
          const vehicle = vehicles[booking.vehicleId];
          if (!vehicle) return null;

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
                    <span style={styles.label}>Pick-up Date:</span> {new Date(booking.pickUpDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.bookingColumn}>
                  <p style={styles.bookingDetail}><span style={styles.label}>Drop-off Location:</span> {booking.dropoffLocation}</p>
                  <p style={styles.bookingDetail}>
                    <span style={styles.label}>Drop-off Date:</span> {new Date(new Date(booking.pickUpDate).getTime() + booking.duration * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.bookingStatusRow}>
                  <p style={styles.bookingDuration}><span style={styles.label}>Duration:</span> {booking.duration} hours</p>
                  <p style={styles.bookingStatus}><span style={styles.label}>Status:</span> {booking.status}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;