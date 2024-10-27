import React from 'react';
import styles from './styles';

const NotFound = () => {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.message}>The page you are looking for does not exist.</p>
      </div>
    );
  };
  
  export default NotFound;