import React, { useState, useEffect } from 'react';
import styles from './styles';
import data from '../../data/sampleRentals.json';

const Summary = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const vehiclesData = data.filter(item => item.id);
  const user = data.find(item => item.user).user;

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images;
    };
    
    const images = importAll(require.context('../../assets/images/exploreVehiclesSection', false, /\.(png|jpe?g|svg|webp|avif)$/));
    
    const loadedImgs = {};
    vehiclesData.forEach(vehicle => {
      const imageName = vehicle.imageUrl.split('/').pop();
      loadedImgs[vehicle.id] = images[imageName];
    });

    setLoadedImages(loadedImgs);
  }, [vehiclesData]);

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Vehicle Booking Summary</h2>
      
      {/* <div style={styles.userInfoCard}>
        <h3 style={styles.cardHeading}>User Information</h3>
        <p style={styles.userInfoItem}><span style={styles.label}>Name:</span> {user.name}</p>
        <p style={styles.userInfoItem}><span style={styles.label}>Email:</span> {user.email}</p>
      </div> */}
      
      <div style={styles.bookingHistory}>
        {/* <h3 style={styles.sectionHeading}>Previous Bookings</h3> */}
        {user.bookings.map((booking, index) => {
          const vehicle = vehiclesData.find(v => v.id === booking.vehicleId);
          return (
            <div key={index} style={styles.bookingCard}>
              <div style={styles.bookingContent}>
                <div style={styles.imageContainer}>
                  {loadedImages[vehicle.id] && (
                    <img 
                      src={loadedImages[vehicle.id]} 
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
                <span style={styles.label}>Pick-up Date:</span> {new Date(booking.date).toLocaleDateString()}
                </p>

                </div>
                <div style={styles.bookingColumn}>
                  <p style={styles.bookingDetail}><span style={styles.label}>Drop-off Location:</span> {booking.dropoffLocation}</p>
                  <p style={styles.bookingDetail}>
                <span style={styles.label}>Drop-off Date:</span> {new Date(new Date(booking.date).getTime() + booking.duration * 60 * 60 * 1000).toLocaleDateString()}
                    </p>

                </div>
                <p style={styles.bookingDuration}><span style={styles.label}>Duration:</span> {booking.duration} hours</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
