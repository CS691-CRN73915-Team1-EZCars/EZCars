import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../api/users';
import styles from './styles'; // Adjust the import as necessary

const ModifyAccount = ({ userId }) => {
  const [accountDetails, setAccountDetails] = useState({
    username: '',
    password: '',
    fullName: '',
    email: ''
  });

  const [editableFields, setEditableFields] = useState({
    username: false,
    password: false,
    fullName: false,
    email: false
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserById(userId);
        setAccountDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value
    });
  };

  const toggleEditField = (fieldName) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: !editableFields[fieldName]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, accountDetails);
      alert('Account details updated successfully!');
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
            readOnly={!editableFields.username}
            placeholder="Enter your username"
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="button" style={styles.editButton} onClick={() => toggleEditField('username')}>
              {editableFields.username ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={accountDetails.password}
            onChange={handleInputChange}
            readOnly={!editableFields.password}
            placeholder="Enter your password"
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="button" style={styles.editButton} onClick={() => toggleEditField('password')}>
              {editableFields.password ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Full Name Field */}
        <div style={styles.formGroup}>
          <label htmlFor="fullName" style={styles.label}>Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={accountDetails.fullName}
            onChange={handleInputChange}
            readOnly={!editableFields.fullName}
            placeholder="Enter your full name"
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="button" style={styles.editButton} onClick={() => toggleEditField('fullName')}>
              {editableFields.fullName ? 'Cancel' : 'Edit'}
            </button>
          </div>
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
            readOnly={!editableFields.email}
            placeholder="Enter your email"
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="button" style={styles.editButton} onClick={() => toggleEditField('email')}>
              {editableFields.email ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <button type="submit" style={styles.button}>Update Account</button>
      </form>
    </div>
  );
};

export default ModifyAccount;
