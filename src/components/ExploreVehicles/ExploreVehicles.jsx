import React, { useState, useEffect } from 'react';
import carData from '../../data/carData.json';
import { styles } from "./styles";
import ViewAll from '../../components/ViewAll'; // Import the ViewAll component

const ExploreVehicles = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
      return images;
    };
    
    const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg|webp|avif)$/));
    
    const loadedImgs = {};
    carData.forEach(car => {
      const imageName = car.imageUrl.split('/').pop();
      loadedImgs[car.id] = images[imageName];
    });

    setLoadedImages(loadedImgs);
  }, []);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  return (
    <div style={styles.exploreVehicles}>
      <h2>Explore Our Vehicles</h2>
      {/* Adding the ViewAll button here */}
      <ViewAll />

      <div style={styles.vehicleGrid}>
        {carData.map((car) => (
          <div key={car.id} style={styles.vehicleCard}>
            {loadedImages[car.id] ? (
              <img src={loadedImages[car.id]} alt={`${car.make} ${car.model}`} style={styles.vehicleCardImg} />
            ) : (
              <div>Loading image...</div>
            )}
            <div style={styles.vehicleCardContent}>
              <h3>{car.make} {car.model} - {car.year}</h3>
              <p>
                {car.mileage} miles • {car.transmission} • {car.fuelType}
              </p>
              <p style={styles.vehiclePrice}>${car.price}</p>
              <span 
                style={styles.viewDetailsLink}
                onClick={() => handleViewDetails(car)}
              >
                View Details <span style={styles.tiltedArrow}>➔</span>
              </span>
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
                <img src={loadedImages[selectedCar.id]} alt={`${selectedCar.make} ${selectedCar.model}`} style={styles.carDetailsImageImg} />
              </div>
              <div>
                <h2 style={styles.carDetailsInfoH2}>{selectedCar.make} {selectedCar.model}</h2>
                <p style={styles.carDetailsInfoP}><strong>Year:</strong> {selectedCar.year}</p>
                <p style={styles.carDetailsInfoP}><strong>Price:</strong> ${selectedCar.price}</p>
                <p style={styles.carDetailsInfoP}><strong>Mileage:</strong> {selectedCar.mileage} Miles</p>
                <p style={styles.carDetailsInfoP}><strong>Transmission:</strong> {selectedCar.transmission}</p>
                <p style={styles.carDetailsInfoP}><strong>Fuel Type:</strong> {selectedCar.fuelType}</p>
                <p style={styles.carDetailsInfoP}><strong>Details:</strong> {selectedCar.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreVehicles;
