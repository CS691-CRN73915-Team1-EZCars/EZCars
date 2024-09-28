import React from "react";
import styles from "./styles"; // Import the styles from styles.js

const GrayListingSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.statBox}>
        <span style={styles.statNumber}>100+</span>
        <span style={styles.statText}>Cars for Rent</span>
      </div>
      <div style={styles.statBox}>
        <span style={styles.statNumber}>50+</span>
        <span style={styles.statText}>Reviews per Day</span>
      </div>
      <div style={styles.statBox}>
        <span style={styles.statNumber}>70+</span>
        <span style={styles.statText}>Visitors per Day</span>
      </div>
      <div style={styles.statBox}>
        <span style={styles.statNumber}>150+</span>
        <span style={styles.statText}>Renters per Day</span>
      </div>
    </div>
  );
};

export default GrayListingSection;
