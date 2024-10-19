import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../api/users';
import styles from './styles'; // Adjust the import as necessary

const ModifyAccount = () => {
  // Get userId from localStorage
  const userId = localStorage.getItem('userId');

  const [accountDetails, setAccountDetails] = useState({
    username: '',
    email: '',
    phoneNumber: ''
  });

  const [isEditable, setIsEditable] = useState(false); // Single state for editing

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserById(userId);
        console.log('Fetched user data:', userData); // Debugging line

        // Assuming userData is in the format: { username, email, phoneNumber }
        setAccountDetails({
          username: userData.username || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || ''
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Check if userId exists before fetching
    if (userId) {
      fetchUserDetails();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]); // Add userId as a dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value
    });
  };

  const validateFields = () => {
    return Object.values(accountDetails).every((value) => value.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      alert('All fields must be filled out.');
      return;
    }

    try {
      await updateUser(userId, accountDetails);
      alert('Account details updated successfully!');
      setIsEditable(false); // Disable editing after successful update
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Modify Account</h2>
      <form onSubmit={handleSubmit}>

        {/* Username Field */}
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={accountDetails.username}
            onChange={handleInputChange}
            readOnly={!isEditable}
            placeholder="Enter your username"
            style={styles.input}
          />
        </div>

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={accountDetails.email}
            onChange={handleInputChange}
            readOnly={!isEditable}
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>

        {/* Phone Number Field */}
        <div style={styles.formGroup}>
          <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={accountDetails.phoneNumber}
            onChange={handleInputChange}
            readOnly={!isEditable}
            placeholder="Enter your phone number"
            style={styles.input}
          />
        </div>

        {/* Single Edit Button */}
        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            style={styles.editButton} 
            onClick={() => setIsEditable((prev) => !prev)} // Toggle edit mode
          >
            {isEditable ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <button type="submit" style={styles.button} disabled={!isEditable}>Update Account</button>
      </form>
    </div>
  );
};

export default ModifyAccount;
