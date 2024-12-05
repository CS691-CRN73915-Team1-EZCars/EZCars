import React, { useState, useEffect } from "react";
import { getPaymentsByUserId } from "../../api/payment";
import styles from "./styles";

// Improved encoding function
const encodeId = (id, prefix) => {
  // Pad the ID to ensure minimum length
  const paddedId = id.toString().padStart(8, '0');
  
  // Simple substitution cipher
  const substitutionMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const substitutedId = paddedId.split('').map(char => 
    substitutionMap[parseInt(char, 10) % substitutionMap.length]
  ).join('');
  
  // Use a fixed set of characters instead of random ones
  const fixedChars = 'BOOK'; // You can change this to any fixed string you prefer
  const combinedString = `${fixedChars}${substitutedId}`;
  const encodedString = btoa(combinedString);
  
  return `${prefix}-${encodedString}`;
};

// Improved decoding function
// const decodeId = (encodedId) => {
//   const [prefix, encodedPart] = encodedId.split('-');
//   const decodedString = atob(encodedPart);
//   const substitutedId = decodedString.slice(4); // Remove fixed chars
  
//   // Reverse substitution
//   const substitutionMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
//   const originalId = substitutedId.split('').map(char => 
//     substitutionMap.indexOf(char).toString().padStart(2, '0')
//   ).join('');
  
//   return parseInt(originalId, 10).toString();
// };

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
                {encodeId(payment.paymentId, 'PY')}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Booking ID:</span>{" "}
                {encodeId(payment.bookingId, 'EZ')}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Booking Amount:</span>{" "}
                ${payment.amount ? payment.amount.toFixed(2) : "N/A"}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Timestamp:</span>{" "}
                {formatDate(payment.timeStamp)}
              </p>
              <p style={styles.bookingDetail}>
                <span style={styles.label}>Status:</span>{" "}
                <span
                  style={{
                    ...styles.statusText,
                    color:
                      payment.status.toLowerCase() === "completed"
                        ? "green"
                        : "red",
                  }}
                >
                  {payment.status}
                </span>
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