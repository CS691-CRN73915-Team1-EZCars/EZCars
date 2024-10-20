import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../api/users';
import styles from './styles'; 

const ModifyAccount = () => {
  const userId = localStorage.getItem('userId');

  const [accountDetails, setAccountDetails] = useState({
    username: '',
    email: '',
    phoneNumber: ''
  });

  const [originalDetails, setOriginalDetails] = useState(null); 
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserById(userId);
        console.log('Fetched user data:', userData);

        setAccountDetails({
          username: userData.username || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || ''
        });

        setOriginalDetails({
          username: userData.username || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || ''
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value
    });
    
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateFields = () => {
    let validationErrors = {
      username: '',
      email: '',
      phoneNumber: ''
    };

    if (!accountDetails.username.trim()) {
      validationErrors.username = 'Username cannot be empty';
    }
    if (!accountDetails.email.trim()) {
      validationErrors.email = 'Email cannot be empty';
    }
    if (!accountDetails.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number cannot be empty';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).every(key => !validationErrors[key]);
  };

  const isDetailsUnchanged = () => {
    // Compare current details with the original details
    return JSON.stringify(accountDetails) === JSON.stringify(originalDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    // Check if the details are unchanged
    if (isDetailsUnchanged()) {
      setSuccessMessage('Details are the same and up to date.');
      setIsEditable(false); 
      return;
    }

    try {
      await updateUser(userId, accountDetails);
      setSuccessMessage('Account details updated successfully!');
      setIsEditable(false); 

      // Update the original details to reflect the changes
      setOriginalDetails({ ...accountDetails });
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account. Please try again.');
    }
  };

  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
    setSuccessMessage('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Modify Account</h2>

      {/* Success message (Green) */}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

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
          {errors.username && <span style={styles.error}>{errors.username}</span>} 
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
          {errors.email && <span style={styles.error}>{errors.email}</span>}
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
          {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
        </div>

        {/* Edit Button */}
        <div style={styles.buttonContainer}>
          <button
            type="button"
            style={styles.editButton}
            onClick={handleEditToggle} 
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
