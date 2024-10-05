// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from './styles'; // Import the styles from the styles.js file

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>TESTING Jenkins Auto Deploy EzCars Test1</div>
      <div style={styles.navContainer}>
        <ul style={styles.navLinks}>
          <li>
            <Link to="/" style={styles.link}>
                <p style={styles.linkText}>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/vehicles" style={styles.link}>
                <p style={styles.linkText}>Vehicles</p>
            </Link>
          </li>
          <li>
            <Link to="/about" style={styles.link}>
                <p style={styles.linkText}>About Us</p>
            </Link>
          </li>
          <li>
            <Link to="/contact" style={styles.link}>
                <p style={styles.linkText}>Contact</p>
            </Link>
          </li>
        </ul>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.buttonLink}>Login</button>
        <button style={styles.button}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;