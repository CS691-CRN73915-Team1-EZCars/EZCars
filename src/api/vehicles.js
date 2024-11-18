const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const getAllVehicles = async (page = 0, size = 12) => {
  const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}&size=${size}`, {
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

export const createVehicle = async (vehicleData) => {
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create vehicle');
  }
  return response.json();
};

export const getVehicleById = async (vehicleId) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  return response.json();
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    throw new Error('Failed to update vehicle');
  }
  return response.json();
};

export const deleteVehicle = async (vehicleId) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }
};



export const searchVehicles = async (searchCriteria, page = 0, size = 12) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (searchCriteria.searchText) queryParams.append('searchText', searchCriteria.searchText);
  if (searchCriteria.make) queryParams.append('make', searchCriteria.make);
  if (searchCriteria.model) queryParams.append('model', searchCriteria.model);
  if (searchCriteria.year) queryParams.append('year', searchCriteria.year.toString());
  if (searchCriteria.minPrice) queryParams.append('minPrice', searchCriteria.minPrice.toString());
  if (searchCriteria.maxPrice) queryParams.append('maxPrice', searchCriteria.maxPrice.toString());

  const response = await fetch(`${API_BASE_URL}/vehicles/search?${queryParams.toString()}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to search vehicles');
  }

  return response.json();
};


export const getMakesAndModels = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles/makes-and-models`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch makes and models');
  }
  return response.json();
};