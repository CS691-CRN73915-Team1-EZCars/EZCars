const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const getAllBookings = async (page = 0, size = 10) => {
  const response = await fetch(`${API_BASE_URL}/bookings?page=${page}&size=${size}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return response.json();
};

  export const getAllBookingsByUserId = async (userId, status, year, month, sortDirection = 'asc') => {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    if (year) queryParams.append('year', year.toString());
    if (month) queryParams.append('month', month.toString());
    queryParams.append('sortDirection', sortDirection);
  
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}?${queryParams.toString()}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookings for user');
    }
    return response.json();
  };

export const getBookingById = async (bookingId) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }
  return response.json();
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create booking');
  }
  return response.json();
};

export const updateBooking = async (bookingId, bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) {
    throw new Error('Failed to update booking');
  }
  return response.json();
};

export const deleteBooking = async (bookingId) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete booking');
  }
};