// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from './styles';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem('username'); // Fetch the username from local storage
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Use navigate for redirection

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown when the location changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the authentication token
    localStorage.removeItem('username'); // Optionally, clear the username
    navigate('/login'); // Redirect to the login page
  };

  // Check if the current path is the login or signup page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>EzCars</div>
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
        {!isAuthPage && (
          <>
            <span style={styles.username}>Welcome, {username}!</span>

            {/* Hamburger menu icon */}
            <div style={styles.hamburgerMenu} onClick={toggleDropdown}>
              &#9776; {/* Unicode for three lines icon */}
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link to="/AccountSummary" style={styles.dropdownLink}>
                  Account Summary
                </Link>
                <Link to="/modify_account" style={styles.dropdownLink}>
                  Modify Account
                </Link>
                <div onClick={handleLogout} style={styles.dropdownLink}>
                  Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
