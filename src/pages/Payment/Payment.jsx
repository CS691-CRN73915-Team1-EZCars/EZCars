import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StripePayment from '../../components/Payment/StripePayment';
import {  updateBookingStatus } from "../../api/bookVehicle";
import styles from "./styles";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bookingId } = location.state;

  const handlePaymentSuccess = () => {

  updateBookingStatus(bookingId, 'CONFIRMED');
    navigate('/VehicleHistory');
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Complete Your Payment</h2>
      <h2>Payment Details</h2>
      <p>Total Booking Amount: ${amount.toFixed(2)}</p>
      <div style={styles.paymentWrapper}>
        <StripePayment 
          amount={amount} 
          bookingId={bookingId} 
          onPaymentSuccess={handlePaymentSuccess} 
        />
      </div>
    </div>
  );
};

export default PaymentPage;