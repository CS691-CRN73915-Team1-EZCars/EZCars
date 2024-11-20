const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };
  

  export const createPaymentIntent = async (amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ amount: amount }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create payment intent');
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        const text = await response.text();
        return { clientSecret: text.trim() };
      }
    } catch (error) {
      console.error('Error in createPaymentIntent:', error);
      throw error;
    }
  };


  export const createPayment = async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(paymentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error in createPayment:', error);
      throw error;
    }
  };
  
  export const getPaymentById = async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/${paymentId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get payment');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error in getPaymentById:', error);
      throw error;
    }
  };
  
  export const getPaymentByBookingId = async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/booking/${bookingId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get payment by booking ID');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error in getPaymentByBookingId:', error);
      throw error;
    }
  };
  
  export const getAllPayments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment`, {
        method: 'GET',
        headers: getHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get all payments');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error in getAllPayments:', error);
      throw error;
    }
  };
  
  export const updatePayment = async (paymentId, paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/${paymentId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(paymentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update payment');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error in updatePayment:', error);
      throw error;
    }
  };
  
  export const deletePayment = async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/${paymentId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }
  
      return true;
    } catch (error) {
      console.error('Error in deletePayment:', error);
      throw error;
    }
  };