const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',  // Ensures footer is at the bottom
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '20px', // Add space between fields
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
    marginBottom: '10px', // Space below input fields
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px', // Space above edit buttons
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Centers the button
    marginTop: '10px', // Space above the button
  },
  footer: {
    marginTop: 'auto', // Pushes footer to the bottom
    textAlign: 'center',
    padding: '10px 0',
    borderTop: '1px solid #ccc',
    marginTop: '20px',
  },
  footerText: {
    color: '#777',
    fontSize: '14px',
  },
};

export default styles;
