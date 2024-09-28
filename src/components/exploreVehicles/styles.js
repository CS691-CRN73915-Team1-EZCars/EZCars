const styles = {
  exploreVehicles: {
    padding: "20px 60px",
    backgroundColor: "#f5f5f5", // Light grey background for the entire page
  },
  vehicleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  vehicleCard: {
    borderRadius: "8px",
    padding: "0", // Removed padding from the entire card
    textAlign: "left",
    maxWidth: "450px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden", // This ensures the image fits within the rounded corners
  },
  vehicleCardImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0", // Rounded corners only on top
  },
  vehicleCardContent: {
    padding: "0px 0px 12px 25px", // Added padding to the content area
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
    borderRadius: "8px",
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
};

const mediaQueries = {
  "@media (max-width: 1400px)": {
    vehicleGrid: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  "@media (max-width: 1200px)": {
    exploreVehicles: {
      padding: "20px 40px",
    },
  },
  "@media (max-width: 1024px)": {
    exploreVehicles: {
      padding: "20px 30px",
    },
  },
  "@media (max-width: 768px)": {
    vehicleGrid: {
      gridTemplateColumns: "1fr",
    },
    exploreVehicles: {
      padding: "20px",
    },
    vehicleCard: {
      maxWidth: "none",
    },
    carDetailsGrid: {
      gridTemplateColumns: "1fr",
    },
  },
};

export { styles, mediaQueries };