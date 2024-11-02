const styles = {
  comparisonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: "20px",
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  vehicleCard: {
    flex: "1",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Aligns content to the top
  },
  vehicleImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  },
  vehiclePropertiesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr", // Single column for each car
    rowGap: "8px",
    marginTop: "10px",
  },
  highlight: {
    //textDecoration: "underline",
    fontWeight: "bold",
  },
  saveBox: {
    backgroundColor: "#e0f7e0", // Light green background for "Save"
    color: "#1a7f1a",
    padding: "5px 10px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
    alignSelf: "left", // Centers the box within the card width
  },
  payBox: {
    backgroundColor: "#fdecea", // Light red background for "Pay"
    color: "#a61d24",
    padding: "5px 10px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
    alignSelf: "left", // Centers the box within the card width
  },
};

export default styles;
