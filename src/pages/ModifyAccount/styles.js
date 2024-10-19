const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff', // White card background
    fontFamily: 'Arial, sans-serif',
  },
  pageBackground: {
    backgroundColor: '#f0f2f5', // Light gray background (similar to Account Summary)
    minHeight: '100vh', // Full viewport height to cover the entire page
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center the card vertically and horizontally
    padding: '20px', // Add padding for better spacing around the card
  },
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '36px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '15px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#f97316',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '10px 0',
    borderTop: '1px solid #ccc',
    color: '#777',
    fontSize: '14px',
  },
};

export default styles;
