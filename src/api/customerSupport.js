const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const getAllTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/customer-support`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }
  return response.json();
};

export const getAllTicketsByCustomerId = async (customerId) => {
  const response = await fetch(`${API_BASE_URL}/customer-support/customer/${customerId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tickets for customer');
  }
  return response.json();
};

export const getTicketById = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/customer-support/${ticketId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ticket');
  }
  return response.json();
};

export const createTicket = async (ticketData) => {
  const response = await fetch(`${API_BASE_URL}/customer-support`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(ticketData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create ticket');
  }
  return response.json();
};

export const updateTicket = async (ticketId, ticketData) => {
  const response = await fetch(`${API_BASE_URL}/customer-support/${ticketId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(ticketData),
  });
  if (!response.ok) {
    throw new Error('Failed to update ticket');
  }
  return response.json();
};

export const deleteTicket = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/customer-support/${ticketId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete ticket');
  }
};