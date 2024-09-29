// src/components/GetStarted/GetStarted.jsx

import React from 'react';
import styles from './styles'; // Adjust the path based on your file structure

const GetStarted = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Welcome to EzCars!</h1>
            <p style={styles.p}>Get ready to explore the best vehicles <br/>
                and offers we have for you.</p>
            <button style={styles.button}>Get Started</button>
        </div>
    );
};

export default GetStarted;
