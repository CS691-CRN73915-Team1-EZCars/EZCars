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