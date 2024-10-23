import React, { useState, useEffect, useCallback } from 'react';
import { getAllVehicles, searchVehicles } from '../../api/vehicles';
import { styles } from "./styles";

const Vehicles = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);
  const [carData, setCarData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchVehicles = useCallback(async () => {
    try {
      let vehicles;
      if (searchTerm || Object.values(filters).some(value => value !== '')) {
        const searchParams = {
          searchText: searchTerm,
          make: filters.make,
          model: filters.model,
        };

        if (filters.year) {
          searchParams.year = parseInt(filters.year);
        }
        if (filters.minPrice) {
          searchParams.minPrice = parseFloat(filters.minPrice);
        }
        if (filters.maxPrice) {
          searchParams.maxPrice = parseFloat(filters.maxPrice);
        }

        vehicles = await searchVehicles(searchParams, page, 12);
      } else {
        vehicles = await getAllVehicles(page, 12);
      }
      setCarData(vehicles.content);
      setTotalPages(vehicles.totalPages);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  }, [page, searchTerm, filters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setPage(0);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  return (
    <div style={styles.exploreVehicles}>
      <h1 style={styles.exploreVehiclesHeading}>All Vehicles</h1>

      <div style={styles.searchAndFilterContainer}>
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <select name="make" value={filters.make} onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Makes</option>
          <option value="Tesla">Tesla</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Ford">Ford</option>
          <option value="Maserati">Maserati</option>
          <option value="BMW">BMW</option>
          <option value="Land Rover">Land Rover</option>
        </select>
        <select name="model" value={filters.model} onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Models</option>
          <option value="Model-S">Model-S</option>
          <option value="F-160">F-160</option>
          <option value="F-150">F-150</option>
          <option value="MC20">MC20</option>
          <option value="X5">X5</option>
          <option value="Range Rover">Range Rover</option>
        </select>
        <select name="year" value={filters.year} onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Years</option>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={2024 - i}>{2024 - i}</option>
          ))}
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          style={styles.priceInput}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          style={styles.priceInput}
        />
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

      <div style={styles.paginationContainer}>
        <button onClick={handlePrevPage} disabled={page === 0} style={styles.paginationButton}>
          Previous
        </button>
        <span style={styles.pageInfo}>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1} style={styles.paginationButton}>
          Next
        </button>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;