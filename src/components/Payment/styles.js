
const styles = {
    stripePaymentContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    cardElementContainer: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
    },
    cardElementOptions: {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          //'::placeholder': {
            //color: '#aab7c4',
          //},
        },
        invalid: {
          color: '#9e2146',
        },
      },
    },
    submitButton: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#f97316',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#4a5fc1',
      },
      ':disabled': {
        backgroundColor: '#9aa4d4',
        cursor: 'not-allowed',
      },
    },
    errorMessage: {
      color: '#e53e3e',
      fontSize: '14px',
      marginTop: '10px',
    },
    successMessage: {
      color: '#38a169',
      fontSize: '18px',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0fff4',
      borderRadius: '8px',
      border: '1px solid #c6f6d5',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
    },
  };
  
  export default styles;