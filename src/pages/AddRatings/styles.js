const styles = {
  container: {
    margin: "2rem auto",
    padding: "2rem",
    width: "50%",
    minHeight: "500px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
    header: {
      textAlign: "center",
      marginBottom: "1.5rem",
      fontSize: "1.5rem",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    input: {
      padding: "0.5rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    textarea: {
      padding: "0.5rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      resize: "none",
      height: "100px",
    },
    stars: {
      display: "flex",
      gap: "0.25rem",
    },
    star: {
      fontSize: "1.5rem",
      color: "#ccc",
      cursor: "pointer",
    },
    starFilled: {
      fontSize: "1.5rem",
      color: "#ffd700",
      cursor: "pointer",
    },
    button: {
      padding: '14px',
      backgroundColor: '#f97316',
      color: '#fff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    },
    username: {
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#f97316",
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      textAlign: 'center',
    }
  };
  
  export default styles;