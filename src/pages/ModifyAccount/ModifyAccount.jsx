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
    phoneNumber: '',
    general: ''
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
        setErrors(prev => ({ ...prev, general: 'Failed to fetch user details. Please try again.' }));
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
      console.error('User ID not found in localStorage');
      setErrors(prev => ({ ...prev, general: 'User ID not found. Please log in again.' }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: '',
      general: ''
    }));
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

    setErrors(prev => ({ ...prev, ...validationErrors }));
    return Object.values(validationErrors).every(error => !error);
  };

  const isDetailsUnchanged = () => {
    return JSON.stringify(accountDetails) === JSON.stringify(originalDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    if (isDetailsUnchanged()) {
      setSuccessMessage('Details are the same and up to date.');
      setIsEditable(false); 
      return;
    }

    try {
      await updateUser(userId, accountDetails);
      setSuccessMessage('Account details updated successfully!');
      setIsEditable(false);
      
      // Update original details to reflect changes
      setOriginalDetails({ ...accountDetails });

      // Update username in localStorage
      localStorage.setItem('username', accountDetails.username); 

      // Dispatch a custom event to notify changes
      window.dispatchEvent(new CustomEvent('usernameUpdated', { detail: accountDetails.username }));

      // Clear errors after successful update
      setErrors({
        username: '',
        email: '',
        phoneNumber: '',
        general: ''
      });
      
    } catch (error) {
      console.error('Error updating account:', error);

      let errorMessage = 'Failed to update account with given data!!.';
      
      if (error.response && error.response.data) {
        console.log('Error response:', JSON.stringify(error.response.data, null, 2));
        
        // Check for specific duplicate entry errors
        if (error.response.data.message.includes('Duplicate entry')) {
          if (error.response.data.message.includes(accountDetails.username)) {
            setErrors(prev => ({ ...prev, username: 'This username is already taken.' }));
          } else if (error.response.data.message.includes(accountDetails.email)) {
            setErrors(prev => ({ ...prev, email: 'This email is already registered.' }));
          } else {
            setErrors(prev => ({ ...prev, general: 'This information is already registered.' }));
          }
          return; 
        }
        
      } else if (error.request) {
        console.log('Error request:', JSON.stringify(error.request, null, 2));
        errorMessage = 'No response received from the server. Please try again.';
        
      } 
      setErrors(prev => ({ ...prev, general: errorMessage }));
    }
  };

  const handleEditToggle = () => {
    setIsEditable(prev => !prev);
    setSuccessMessage('');
    
    // Clear errors when toggling edit mode
    setErrors({
      username: '',
      email: '',
      phoneNumber: '',
      general: ''
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Modify Account</h2>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errors.general && <p style={styles.errorMessage}>{errors.general}</p>}

      <form onSubmit={handleSubmit}>
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