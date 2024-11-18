import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from "../../api/payment";
import styles from './styles';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHER_KEY);

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null); 
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const data = await createPaymentIntent(amount); 
        setClientSecret(data.clientSecret); 
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchClientSecret();
  }, [amount]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError('Card element not found.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      setError(result.error.message);
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        setPaymentSuccess(true);
        setError(null);
        onPaymentSuccess();
      }
    }
  };

  if (paymentSuccess) {
    return <div style={styles.successMessage}>Payment successful! Thank you for your purchase.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.cardElementContainer}>
        <CardElement options={styles.cardElementOptions} />
      </div>
      <button type="submit" disabled={!stripe} style={styles.submitButton}>
        Pay
      </button>
      {error && <div style={styles.errorMessage}>{error}</div>}
    </form>
  );
};

const StripePayment = ({ amount, onPaymentSuccess }) => {
  return (
    <div style={styles.stripePaymentContainer}>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
      </Elements>
    </div>
  );
};

export default StripePayment;