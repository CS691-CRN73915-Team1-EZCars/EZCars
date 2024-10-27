import React, { useState, useEffect } from 'react';
import { getAllVehicles } from '../../api/vehicles';
import { styles } from "./styles";

const ExploreVehicles = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);
  const [carData, setCarData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchVehicles = async () => {
      try {
        const vehicles = await getAllVehicles(0, 6);
        setCarData(vehicles.content);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images;
    };
    
    const images = importAll(require.context('../../assets/images/exploreVehiclesSection', false, /\.(png|jpe?g|svg|webp|avif)$/));
    
    const loadedImgs = {};
    carData.forEach(car => {
      const imageName = car.imageUrl.split('/').pop();
      loadedImgs[car.vehicleId] = images[imageName];
    });

    setLoadedImages(loadedImgs);
  }, [carData]);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  const handleBookCar = (car) => {
    // Implement booking logic here
    console.log(`Booking car: ${car.make} ${car.model}`);
  };

  return (
    <div style={styles.exploreVehicles}>
      <h1 style={styles.exploreVehiclesHeading}>Explore Our Vehicles</h1>
      <div style={styles.viewAllContainer}>
        <a href="/vehicles" style={styles.viewAllLink}>View All ↗️</a>
      </div>

      <div style={styles.vehicleGrid}>
        {carData.map((car) => (
          <div key={car.vehicleId} style={styles.vehicleCard}>
            {loadedImages[car.vehicleId] ? (
              <img src={loadedImages[car.vehicleId]} alt={`${car.make} ${car.model}`} style={styles.vehicleCardImg} />
            ) : (
              <div>Loading image...</div>
            )}
            <div style={styles.vehicleCardContent}>
              <h3>{car.make} {car.model} - {car.year}</h3>
              <p>
                {car.mileage} miles • {car.transmission} • {car.fuelType}
              </p>
              <p style={styles.vehiclePrice}>${car.price}</p>
              <div style={styles.actionButtons}>
                <span 
                  style={styles.viewDetailsLink}
                  onClick={() => handleViewDetails(car)}
                >
                  View Details <span style={styles.tiltedArrow}>➔</span>
                </span>
                {isLoggedIn && (
                  <button 
                    style={styles.bookButton}
                    onClick={() => handleBookCar(car)}
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div style={styles.carDetailsModal} onClick={handleCloseDetails}>
          <div style={styles.carDetailsContent} onClick={(e) => e.stopPropagation()}>
            <span style={styles.closeLink} onClick={handleCloseDetails}>&times;</span>
            <div style={styles.carDetailsGrid}>
              <div>
                <img src={loadedImages[selectedCar.vehicleId]} alt={`${selectedCar.make} ${selectedCar.model}`} style={styles.carDetailsImageImg} />
              </div>
              <div>
                <h2 style={styles.carDetailsInfoH2}>{selectedCar.make} {selectedCar.model}</h2>
                <p style={styles.carDetailsInfoP}><strong>Year:</strong> {selectedCar.year}</p>
                <p style={styles.carDetailsInfoP}><strong>Price:</strong> ${selectedCar.price}</p>
                <p style={styles.carDetailsInfoP}><strong>Mileage:</strong> {selectedCar.mileage} Miles</p>
                <p style={styles.carDetailsInfoP}><strong>Transmission:</strong> {selectedCar.transmission}</p>
                <p style={styles.carDetailsInfoP}><strong>Fuel Type:</strong> {selectedCar.fuelType}</p>
                <p style={styles.carDetailsInfoP}><strong>Details:</strong> {selectedCar.details}</p>
                {isLoggedIn && (
                  <button 
                    style={styles.bookButton}
                    onClick={() => handleBookCar(selectedCar)}
                  >
                    Book This Car
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreVehicles;