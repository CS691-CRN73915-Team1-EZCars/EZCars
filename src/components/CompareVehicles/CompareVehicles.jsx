// src/components/CompareVehicles/CompareVehicles.jsx
import React from 'react';
import styles from './styles';

const CompareVehicles = ({ compareList, loadedImages, onClose }) => {
  const baseCar = compareList[0];

  const calculateDifference = (vehicle) => {
    if (!baseCar || vehicle.vehicleId === baseCar.vehicleId) return 0;
    return baseCar.price - vehicle.price;
  };

  const isDifferent = (property, vehicle) => {
    return vehicle[property] !== baseCar[property];
  };

  return (
    <div style={styles.modalContainer}>
      <button onClick={onClose} style={styles.closeButton}>X</button>
      <h2>Compare Vehicles</h2>
      <div style={styles.comparisonContainer}>
        {compareList.map((vehicle, index) => (
          <div key={index} style={styles.vehicleCard}>
            <img 
              src={loadedImages[vehicle.vehicleId]} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              style={styles.vehicleImage} 
            />
            <h3>{vehicle.make} {vehicle.model}</h3>
            <div style={styles.vehicleProperties}>
              <p style={isDifferent('year', vehicle) ? styles.highlight : {}}>
                Year: {vehicle.year}
              </p>
              <p style={isDifferent('price', vehicle) ? styles.highlight : {}}>
                Price: ${vehicle.price}
              </p>
              <p style={isDifferent('mileage', vehicle) ? styles.highlight : {}}>
                Mileage: {vehicle.mileage} miles
              </p>
              <p style={isDifferent('transmission', vehicle) ? styles.highlight : {}}>
                Transmission: {vehicle.transmission}
              </p>
              <p style={isDifferent('fuelType', vehicle) ? styles.highlight : {}}>
                Fuel Type: {vehicle.fuelType}
              </p>
            </div>
            {vehicle.vehicleId !== baseCar.vehicleId && (
              <p style={calculateDifference(vehicle) > 0 ? styles.saveBox : styles.payBox}>
                {calculateDifference(vehicle) > 0
                  ? `Save $${calculateDifference(vehicle)}`
                  : `Pay $${Math.abs(calculateDifference(vehicle))} more`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareVehicles;
