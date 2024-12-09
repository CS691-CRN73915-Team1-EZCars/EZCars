import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './styles'; 

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token'); 

  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleUsernameUpdate = (event) => {
      setUsername(event.detail);
    };

    window.addEventListener('usernameUpdated', handleUsernameUpdate);

    return () => {
      window.removeEventListener('usernameUpdated', handleUsernameUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    navigate('/login'); 
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>
    <div style={styles.logo}>EzCars</div>
  </Link>
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
                    <Link to="/ModifyAccount" style={styles.dropdownLink}>
                      Modify Account
                    </Link>
                    <Link to="/CustomerSupport" style={styles.dropdownLink}>
                    Customer Support
                    </Link>
                    <Link to="/VehicleHistory" style={styles.dropdownLink}>
                    View Bookings
                    </Link>
                    <Link to="/PaymentHistory" style={styles.dropdownLink}>
                    Payment History
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
