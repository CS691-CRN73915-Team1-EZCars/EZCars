const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const createRating = async (rating) => {
  const response = await fetch(`${API_BASE_URL}/rating`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(rating),
  });
  if (!response.ok) {
    throw new Error('Failed to create rating');
  }
  return response.json();
};

export const getRatingById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rating/${id}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch rating');
  }
  return response.json();
};

export const getAllRatingsByVehicleId = async (vehicleId) => {
  const response = await fetch(`${API_BASE_URL}/rating/vehicle/${vehicleId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ratings for vehicle');
  }
  return response.json();
};

export const updateRating = async (id, ratingDetails) => {
  const response = await fetch(`${API_BASE_URL}/rating/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(ratingDetails),
  });
  if (!response.ok) {
    throw new Error('Failed to update rating');
  }
  return response.json();
};

export const deleteRating = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rating/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete rating');
  }
};