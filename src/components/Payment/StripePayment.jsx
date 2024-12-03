import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, updatePayment, createPayment } from "../../api/payment";
import styles from './styles';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHER_KEY);

const CheckoutForm = ({ amount, bookingId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const intentData = await createPaymentIntent(amount);
        setClientSecret(intentData.clientSecret);
      } catch (err) {
        setError(err.message);
      }
    };

    initiatePayment();
  }, [amount, bookingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardHolderName.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError('Card element not found.');
      return;
    }

    try {
      const paymentData = {
        bookingId: bookingId,
        amount: amount,
        status: 'PENDING',
        timeStamp: new Date().toISOString(),
      };
      const payment = await createPayment(paymentData);
     
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolderName,
          },
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        await updatePayment(payment.paymentId, { 
          status: 'COMPLETED',
          timeStamp: new Date().toISOString(),
        });
        setPaymentSuccess(true);
        setError(null);
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  if (paymentSuccess) {
    return <div style={styles.successMessage}>Payment successful! Thank you for booking with EzCars.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
        placeholder="Card Holder Name"
        required
        style={styles.input}
      />
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

const StripePayment = ({ amount, bookingId, onPaymentSuccess }) => {
  return (
    <div style={styles.stripePaymentContainer}>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} bookingId={bookingId} onPaymentSuccess={onPaymentSuccess} />
      </Elements>
    </div>
  );
};

export default StripePayment;