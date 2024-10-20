const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#333',
      color: '#fff',
    },
    logo: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#fff',
    },
    navContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    navLinks: {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      gap: '20px',
    },
    link: {
      color: '#ddd',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'normal',
      padding: '10px 15px',
      transition: 'color 0.3s ease',
    },
    linkText: {
      fontSize: '16px',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative', // To position dropdown relative to this container
    },
    username: {
      marginRight: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ff7f00',
    },
    hamburgerMenu: {
      fontSize: '24px', // Bigger size for the hamburger menu
      cursor: 'pointer',
      color: '#fff',
      padding: '5px',
      transition: 'color 0.3s ease',
    },
    hamburgerMenuHover: {
      color: '#ff7f00', // Change color on hover
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%', // Position the dropdown just below the hamburger menu
      right: '0',
      backgroundColor: '#333',
      borderRadius: '5px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      padding: '10px 0',
      zIndex: 1, // Ensure it stays above other elements
    },
    dropdownLink: {
      display: 'block',
      padding: '10px 20px',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      transition: 'background-color 0.3s ease',
    },
    dropdownLinkHover: {
      backgroundColor: '#ff7f00',
    },
    authButton: {
      backgroundColor: '#ff7f00', // Button background color
      color: '#fff', // Text color
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease', // Smooth transition for hover
      marginRight: '10px', // Add margin to the right of the Login button
    },
  };
  
  export default styles;
  