// src/components/CompareVehicles/CompareVehicles.jsx
import React from 'react';

const CompareVehicles = ({ compareList, loadedImages }) => {
  // Use the first car in the list as a baseline for comparison
  const baseCar = compareList[0];

  const calculateDifference = (vehicle) => {
    if (!baseCar || vehicle.vehicleId === baseCar.vehicleId) return 0;
    return baseCar.price - vehicle.price;
  };

  return (
    <div>
      <h2>Compare Vehicles</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {compareList.map((vehicle, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#fff" }}>
            <img 
              src={loadedImages[vehicle.vehicleId]} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px 8px 0 0" }} 
            />
            <h3>{vehicle.make} {vehicle.model}</h3>
            <p>Year: {vehicle.year}</p>
            <p>Price: ${vehicle.price}</p>
            <p>Mileage: {vehicle.mileage} miles</p>
            <p>Transmission: {vehicle.transmission}</p>
            <p>Fuel Type: {vehicle.fuelType}</p>

            {/* Show price difference relative to the base car */}
            {vehicle.vehicleId !== baseCar.vehicleId && (
              <p>
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
