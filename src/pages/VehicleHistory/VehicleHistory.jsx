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
  const [filters, setFilters] = useState({
    status: '',
    year: '',
    month: '',
    sortDirection: 'asc'
  });

  const userId = localStorage.getItem('userId');

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleViewBooking = (bookingId) => {
    console.log(`Viewing booking with ID: ${bookingId}`);
  
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
          filters.sortDirection
        );

        setBookings(bookingsResponse || []);

        const vehiclesResponse = await getAllVehicles(0, 200);
        const allVehicles = vehiclesResponse.content || [];

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
  }, [userId, filters]);

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

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Booking Summary</h2>
      
      <div style={styles.filterContainer}>
        <select name="status" value={filters.status} onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Combined Month-Year Picker */}
        <div style={styles.monthYearPicker}>
          <select name="year" value={filters.year} onChange={handleFilterChange} style={styles.filterSelect}>
            <option value="">Year</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={2024 - i}>{2024 - i}</option>
            ))}
          </select>

          <select name="month" value={filters.month} onChange={handleFilterChange} style={styles.filterSelect}>
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </div>

        <select name="sortDirection" value={filters.sortDirection} onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Show message if no bookings found */}
      {(!bookings.length && !error) && (
        <div style={styles.fullPageMessage}>No bookings found with the selected filters!!</div>
      )}

      {/* Show message if no vehicles found */}
      {(!Object.keys(vehicles).length && error === "No vehicles found.") && (
        <div style={styles.fullPageMessage}>No vehicles found with the selected filters!!</div>
      )}

      {bookings.length > 0 && (
        <div style={styles.bookingHistory}>
          {bookings.map((booking) => {
            const vehicle = vehicles[booking.vehicleId];
            if (!vehicle) return null;

            const pickUpDateTime = new Date(booking.pickUpDate);
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
                    <p style={styles.vehicleDetail}><span style={styles.label}>Mileage:</span> {vehicle.mileage} mpg</p>
                    <p style={styles.bookingPrice}>
                      <span style={styles.label}>Booking Price:</span> ${(vehicle.price * booking.duration).toFixed(2)}
                    </p>
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
                  <p style={styles.bookingStatus}><span style={styles.label}>Status:</span> {booking.status}</p>
                    <p style={styles.bookingDuration}><span style={styles.label}>Duration:</span> {booking.duration} days</p>                 
                  </div>
                  <div style={styles.buttonContainer}>
    <button
      onClick={() => handleViewBooking(booking.id)}
      style={styles.viewBookingButton}
    >
      View Booking
    </button>
    <button
      onClick={() => handleDeleteBooking(booking.id)}
      style={styles.deleteButton}
    >
      Delete Booking
    </button>
  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Summary;