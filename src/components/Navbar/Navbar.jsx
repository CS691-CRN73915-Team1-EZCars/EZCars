import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from './styles'; // Assuming you have an external styles object

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token'); // Fetch the token from localStorage
  //const username = localStorage.getItem('username'); // Fetch the username from localStorage
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
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

  useEffect(() => {
    const handleUsernameUpdate = (event) => {
      setUsername(event.detail);
    };

    window.addEventListener('usernameUpdated', handleUsernameUpdate);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('usernameUpdated', handleUsernameUpdate);
    };
  }, []);

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
            {!token ? (
              <>
                <Link to="/login">
                  <button
                    style={styles.authButton}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    style={styles.authButton}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <span style={styles.username}>Welcome, {username}!</span>
                <div style={styles.hamburgerMenu} onClick={toggleDropdown}>
                  &#9776;
                </div>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
