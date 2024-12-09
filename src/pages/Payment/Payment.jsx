import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StripePayment from '../../components/Payment/StripePayment';
import { updateBookingStatus } from "../../api/bookVehicle";
import { getPaymentByBookingId } from "../../api/payment";
import styles from "./styles";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bookingId } = location.state;
  const [adjustedAmount, setAdjustedAmount] = useState(amount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const paymentDetails = await getPaymentByBookingId(bookingId);
        if (paymentDetails && paymentDetails.status === 'COMPLETED') {
          const paidAmount = paymentDetails.amount;
          const newAmount = Math.max(amount - paidAmount, 0);
          setAdjustedAmount(newAmount);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [bookingId, amount]);

  const handlePaymentSuccess = async () => {
    await updateBookingStatus(bookingId, 'CONFIRMED');
    navigate('/VehicleHistory');
  };

  if (isLoading) {
    return <div style={styles.container}>Loading...</div>;
  }
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Complete Your Payment</h2>
      <h2>Payment Details</h2>
      <p>Total Booking Amount: ${amount.toFixed(2)}</p>
      {adjustedAmount !== amount && (
        <p>Amount to be paid extra : ${adjustedAmount.toFixed(2)}</p>
      )}
      <div style={styles.paymentWrapper}>
        <StripePayment 
          amount={adjustedAmount} 
          bookingId={bookingId} 
          onPaymentSuccess={handlePaymentSuccess} 
        />
      </div>
    </div>
  );
};

export default PaymentPage;