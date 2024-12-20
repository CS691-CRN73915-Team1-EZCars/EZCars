import React, { useState, useEffect } from "react";
import { getAllVehicles } from "../../api/vehicles";
import { styles } from "./styles";
import CompareVehicles from "../CompareVehicles/CompareVehicles";
import { useNavigate } from "react-router-dom";

const ExploreVehicles = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);
  const [carData, setCarData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchVehicles = async () => {
      try {
        const vehicles = await getAllVehicles(0, 6);
        setCarData(vehicles.content);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

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
    carData.forEach((car) => {
      const imageName = car.imageUrl.split("/").pop();
      loadedImgs[car.vehicleId] = images[imageName];
    });

    setLoadedImages(loadedImgs);
  }, [carData]);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const handleBookCar = (car) => {
    navigate("/BookVehicle", { state: { vehicleId: car.vehicleId } });
  };

  const handleRatingClick = (vehicleId) => {
    navigate(`/VehicleRating/${vehicleId}`); 
};

  const handleCompareCar = (car) => {
    setCompareList((prevList) => {
      if (prevList.find((v) => v.vehicleId === car.vehicleId)) {
        return prevList.filter((v) => v.vehicleId !== car.vehicleId);
      } else if (prevList.length < 3) {
        return [...prevList, car];
      } else {
        setPopupMessage("You can only compare up to 3 vehicles.");
        setShowPopup(true);
        return prevList;
      }
    });
  };

  const showComparisonPage = () => {
    setShowComparisonModal(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={styles.exploreVehicles}>
      <h1 style={styles.exploreVehiclesHeading}>Explore Our Vehicles</h1>
      <div style={styles.viewAllContainer}>
        <a href="/vehicles" style={styles.viewAllLink}>
          View All ↗️
        </a>
      </div>

      <div style={styles.vehicleGrid}>
        {carData.map((car) => (
          <div key={car.vehicleId} style={styles.vehicleCard}>
            {loadedImages[car.vehicleId] ? (
              <img
                src={loadedImages[car.vehicleId]}
                alt={`${car.make} ${car.model}`}
                style={styles.vehicleCardImg}
              />
            ) : (
              <div>Loading image...</div>
            )}
            <div style={styles.vehicleCardContent}>
              <h3>
                {car.make} {car.model} - {car.year}
              </h3>
              <p>
                {car.mileage} miles • {car.transmission} • {car.fuelType}
              </p>
              <p style={styles.vehiclePrice}>${car.price}</p>
              <div
                                style={styles.ratingContainer}
                                onClick={() => handleRatingClick(car.vehicleId)} // Make rating clickable
                            >
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            ...styles.starRating,
                                            ...(index < Math.round(car.rating)
                                                ? styles.filledStar
                                                : styles.emptyStar),
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                                <span style={styles.ratingNumber}>
                                    ({car.rating.toFixed(1)})
                                </span>
                            </div>
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
                {isLoggedIn && (
                  <button
                    style={styles.compareButton}
                    onClick={() => handleCompareCar(car)}
                  >
                    {compareList.find((v) => v.vehicleId === car.vehicleId)
                      ? "Remove from Compare"
                      : "Compare"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn && compareList.length > 0 && (
        <div style={styles.compareScroll}>
          {compareList.map((car) => (
            <div key={car.vehicleId}>
              <img
                src={loadedImages[car.vehicleId]}
                alt={car.make}
                width="70"
              />
              <button
                style={styles.removeButton}
                onClick={() => handleCompareCar(car)}
              >
                Remove
              </button>
            </div>
          ))}
          {compareList.length > 1 && (
            <button style={styles.compareButton} onClick={showComparisonPage}>
              Compare
            </button>
          )}
        </div>
      )}

      {showComparisonModal && (
        <div style={styles.modalBackground}>
          <div style={styles.modalContent}>
            <span
              style={styles.closeButton}
              onClick={() => setShowComparisonModal(false)}
            >
              &times;
            </span>
            <CompareVehicles
              compareList={compareList}
              loadedImages={loadedImages}
            />
          </div>
        </div>
      )}

      {selectedCar && (
        <div style={styles.carDetailsModal}>
          <div style={styles.carDetailsContent}>
            <span
              style={styles.closeButton}
              onClick={() => setSelectedCar(null)}
            >
              &times;
            </span>
            <div style={styles.carDetailsGrid}>
              <div>
                <img
                  src={loadedImages[selectedCar.vehicleId]}
                  alt={`${selectedCar.make} ${selectedCar.model}`}
                  style={styles.carDetailsImageImg}
                />
              </div>
              <div>
                <h2 style={styles.carDetailsInfoH2}>
                  {selectedCar.make} {selectedCar.model}
                </h2>
                <p style={styles.carDetailsInfoP}>
                  <strong>Year:</strong> {selectedCar.year}
                </p>
                <p style={styles.carDetailsInfoP}>
                  <strong>Price:</strong> ${selectedCar.price}
                </p>
                <p style={styles.carDetailsInfoP}>
                  <strong>Mileage:</strong> {selectedCar.mileage} Miles
                </p>
                <p style={styles.carDetailsInfoP}>
                  <strong>Transmission:</strong> {selectedCar.transmission}
                </p>
                <p style={styles.carDetailsInfoP}>
                  <strong>Fuel Type:</strong> {selectedCar.fuelType}
                </p>
                <p style={styles.carDetailsInfoP}>
                  <strong>Details:</strong> {selectedCar.details}
                </p>
                <div style={styles.ratingContainer}
                onClick={() => handleRatingClick(selectedCar.vehicleId)}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        ...styles.starRating,
                        ...(index < Math.round(selectedCar.rating)
                          ? styles.filledStar
                          : styles.emptyStar),
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span style={styles.ratingNumber}>
                    ({selectedCar.rating.toFixed(1)})
                  </span>
                </div>
                {isLoggedIn && (
                  <button
                    style={styles.bookCarButton}
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

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Note</h2>
            <p>{popupMessage}</p>
            <button onClick={closePopup} style={styles.popupCloseButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreVehicles;
