import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Range } from 'react-range';
import { getAllVehicles, searchVehicles } from '../../api/vehicles';
import { styles } from "./styles";
import carMakeModelData from '../../data/carData.json';
import CompareVehicles from '../../components/CompareVehicles/CompareVehicles';

const Vehicles = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);
  const [carData, setCarData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    minPrice: 10,
    maxPrice: 1200,
  });
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const vehiclesPerPage = 12;
  const filterRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setMakes(carMakeModelData.makes);
    setModels(carMakeModelData.models);
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      let vehicles;
      if (searchTerm || Object.values(filters).some(value => value !== '')) {
        const searchParams = {
          searchText: searchTerm,
          make: filters.make,
          model: filters.model,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        };
        if (filters.year) {
          searchParams.year = parseInt(filters.year);
        }
        vehicles = await searchVehicles(searchParams, page, vehiclesPerPage);
      } else {
        vehicles = await getAllVehicles(page, vehiclesPerPage);
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
      r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    };
    const images = importAll(require.context('../../assets/images/vehicles', false, /\.(png|jpe?g|svg|webp|avif)$/));
  
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = { ...prevLoadedImages };
      carData.forEach((car) => {
        const imageName = car.imageUrl.split('/').pop();
        newLoadedImages[car.vehicleId] = images[imageName];
      });
      return newLoadedImages;
    });
  }, [carData]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setPage(0);
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
    setFilters(prevFilters => ({ ...prevFilters, minPrice: values[0], maxPrice: values[1] }));
    setPage(0);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  const handleBookCar = (car) => {
    navigate('/BookVehicle', { state: { vehicleId: car.vehicleId } });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCompareCar = (car) => {
    setCompareList((prevList) => {
      if (prevList.some((v) => v.vehicleId === car.vehicleId)) {
        return prevList.filter((v) => v.vehicleId !== car.vehicleId);
      } else if (prevList.length < 3) {
        return [...prevList, car];
      } else {
        alert("You can only compare up to 3 vehicles.");
        return prevList;
      }
    });
  };

  const showComparisonPage = () => {
    setShowComparisonModal(true);
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
        <div style={styles.filterDropdown} ref={filterRef}>
          <button onClick={toggleFilters} style={styles.filterButton}>
            Filters
          </button>
          {showFilters && (
            <div style={styles.filterMenu}>
              <select name="make" value={filters.make} onChange={handleFilterChange} style={styles.filterSelect}>
                <option value="">All Makes</option>
                {makes.map((make, index) => (
                  <option key={index} value={make}>{make}</option>
                ))}
              </select>
              <select name="model" value={filters.model} onChange={handleFilterChange} style={styles.filterSelect}>
                <option value="">All Models</option>
                {models.map((model, index) => (
                  <option key={index} value={model}>{model}</option>
                ))}
              </select>
              <select name="year" value={filters.year} onChange={handleFilterChange} style={styles.filterSelect}>
                <option value="">All Years</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 - i}>{2024 - i}</option>
                ))}
              </select>
              <div style={styles.priceRangeContainer}>
                <span style={styles.priceRangetext}>Price Range</span>
                <Range
                  step={10}
                  min={10}
                  max={1200}
                  values={priceRange}
                  onChange={handlePriceRangeChange}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{ ...props.style, height: '6px', width: '100%', backgroundColor: '#ddd' }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{ ...props.style, height: '20px', width: '20px', borderRadius: '50%', backgroundColor: '#f97316' }}
                    />
                  )}
                />
                <div style={styles.priceRangeLabels}>
                  <span style={styles.priceRangeLabel}>${priceRange[0]}</span>
                  <span style={styles.priceRangeLabel}>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoggedIn && compareList.length > 0 && (
        <div style={styles.compareScroll}>
          {compareList.map((car) => (
            <div key={car.vehicleId}>
              <img src={loadedImages[car.vehicleId]} alt={car.make} width="70" />
              <button style={styles.removeButton} onClick={() => handleCompareCar(car)}>Remove</button>
            </div>
          ))}
          {compareList.length > 1 && (
            <button style={styles.compareButton} onClick={showComparisonPage}>Compare</button>
          )}
        </div>
      )}
      {showComparisonModal && (
        <div style={styles.modalBackground}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={() => setShowComparisonModal(false)}>&times;</span>
            <CompareVehicles compareList={compareList} loadedImages={loadedImages} />
          </div>
        </div>
      )}
      <div style={styles.vehicleGrid}>
        {carData.length === 0 ? (
          <p style={styles.searchResult}>No results found!!</p>
        ) : (
          carData.map((car) => (
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
                  <span style={styles.viewDetailsLink} onClick={() => handleViewDetails(car)}>
                    View Details
                    <span style={styles.tiltedArrow}>➔</span>
                  </span>
                  <button style={styles.bookButton} onClick={() => handleBookCar(car)}>
                    Book
                  </button>
                  <button style={styles.compareButton} onClick={() => handleCompareCar(car)}>
                    {compareList.find(v => v.vehicleId === car.vehicleId) ? 'Remove from Compare' : 'Compare'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button onClick={handlePrevPage} disabled={page === 0} style={styles.paginationButton}>
            Previous
          </button>
          <span style={styles.pageInfo}>Page {page + 1} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1} style={styles.paginationButton}>
            Next
          </button>
        </div>
      )}
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
                  <button style={styles.bookCarButton} onClick={() => handleBookCar(selectedCar)}>
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

export default Vehicles;