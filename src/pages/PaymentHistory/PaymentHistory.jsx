import React, { useState, useEffect } from "react";
import { getPaymentsByUserId } from "../../api/payment";
import styles from "./styles";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const userId = localStorage.getItem("userId");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await getPaymentsByUserId(
          userId,
          currentPage,
          pageSize
        );
        setPayments(response.content || []);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setError("Failed to fetch payment history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPayments();
    } else {
      setError("No user ID provided.");
      setIsLoading(false);
    }
  }, [userId, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) return <div style={styles.fullPageMessage}>Loading...</div>;

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Payment History</h2>
      {error && <div style={styles.fullPageMessage}>{error}</div>}
      {payments.length === 0 ? (
        <div style={styles.fullPageMessage}>No payments found.</div>
      ) : (
        <div style={styles.bookingHistory}>
          {payments.map((payment) => (
            <div key={payment.paymentId} style={styles.bookingCard}>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Payment ID:</span>{" "}
                {payment.paymentId}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Booking ID:</span>{" "}
                {payment.bookingId}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Booking Amount:</span>
                {payment.amount ? payment.amount.toFixed(2) : "N/A"}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Timestamp:</span>{" "}
                {formatDate(payment.timeStamp)}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Status:</span> {payment.status}
              </p>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            style={styles.paginationButton}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>
            {" "}
            Page {currentPage + 1} of {totalPages}{" "}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            style={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
