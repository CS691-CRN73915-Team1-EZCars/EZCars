const styles = {
    exploreVehicles: {
      padding: "60px 80px",
      backgroundColor: "#f5f5f5",
    },
    exploreVehiclesHeading: {
      marginLeft: "20px", 
      marginTop: "20px", 
    },
    vehicleGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      padding: "20px 25px",
    },
    vehicleCard: {
      borderRadius: "8px",
      textAlign: "left",
      width: "100%",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    vehicleCardImg: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "8px 8px 0 0",
    },
    vehicleCardContent: {
      padding: "12px 25px",
    },
    vehiclePrice: {
      fontWeight: "bold",
      fontSize: "1.2em",
      color: "#333",
    },
    viewDetailsLink: {
      color: "orange",
      cursor: "pointer",
      display: "inline-block",
      textDecoration: "none",
    },
    tiltedArrow: {
      display: "inline-block",
      transform: "rotate(-45deg)",
      marginLeft: "5px",
    },
    carDetailsModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    carDetailsContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "800px",
      width: "90%",
      position: "relative",
    },
    closeLink: {
      position: "absolute",
      top: "10px",
      right: "15px",
      fontSize: "24px",
      color: "#333",
      cursor: "pointer",
    },
    carDetailsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    carDetailsImageImg: {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
    },
    carDetailsInfoH2: {
      color: "#333",
    },
    carDetailsInfoP: {
      margin: "5px 0",
      color: "#666",
    },
    searchAndFilterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '10px',
      backgroundColor: '#ffffff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    searchInput: {
      padding: '10px',
      fontSize: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '200px',
      flex: '1 1 200px',
    },
    filterSelect: {
      padding: '10px',
      fontSize: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: '1 1 150px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px top 50%',
      backgroundSize: '12px auto',
    },
    priceInput: {
      padding: '10px',
      fontSize: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100px',
      flex: '1 1 100px',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
    },
    paginationButton: {
      padding: '10px 20px',
      fontSize: '1em',
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '0 10px',
    },
    pageInfo: {
      fontSize: '1em',
      margin: '0 10px',
    },
  };
  
  export { styles };