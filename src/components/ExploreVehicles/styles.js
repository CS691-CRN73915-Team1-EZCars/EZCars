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
    gridTemplateColumns: "repeat(3, 1fr)", // Ensures 3 cards in a row
    gap: "20px", // Consistent gap between cards
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
    maxWidth: "950px",
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
    gridTemplateColumns: "1fr 1fr", // Two columns for car details
    gap: "20px", // Gap between details
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
  compareScroll: {
    display: "flex",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(241, 241, 241, 0.9)", // Add transparency
    padding: "15px 0", // Increase padding for height
    alignItems: "center",
    justifyContent: "flex-start",
    overflowX: "auto",
    borderTop: "1px solid #ccc",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)", // Optional: add a slight blur effect
  },
  carImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px",
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  carImage: {
    width: "70px", // Increase image size if desired
    height: "50px",
    objectFit: "cover",
    marginBottom: "5px",
  },
  removeButton: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "3px 8px",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
  },
  compareButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
    whiteSpace: "nowrap",
  },
  
// View All Styles
viewAllContainer:{
   display:'flex',
   flexDirection:'column',
   alignItems:'center',
   justifyContent:'center',
   padding:'0 60px',
   margin:'40px',
},
viewAllTitle:{
   fontSize:'1.8em',
   color:'#333',
},
viewAllLink:{
   fontSize:'1.4em',
   color:'black',
   textDecoration:'none',
   cursor:'pointer',
},
bookButton: {
  backgroundColor: '#f97316',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '50px',
},
actionButtons: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
},
bookCarButton: {
  backgroundColor: '#f97316',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '30px',
},
modalBackground: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
},
modalContent: {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "800px",
  width: "90%",
}
};

export { styles };