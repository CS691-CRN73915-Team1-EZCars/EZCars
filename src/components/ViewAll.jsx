import React from 'react';

const ViewAll = () => {
  return (
    <div style={styles.viewAllContainer}>
      
      <a href="/vehicles" style={styles.viewAllLink}>View All ↗</a>
    </div>
  );
};

const styles = {
  viewAllContainer: {
    display: 'flex',
    flexDirection: 'column', // Change to column for vertical stacking
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: '0 60px',
    marginBottom: '20px',
  },
  viewAllTitle: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '10px', // Space between title and link
  },
  viewAllLink: {
    fontSize: '1.1em',
    color: 'orange',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

export default ViewAll;
