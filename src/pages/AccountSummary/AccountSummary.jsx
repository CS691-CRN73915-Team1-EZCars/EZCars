import React, { useState, useEffect } from 'react';
import styles from './styles';
import data from '../../data/userData.json';
import { Link } from 'react-router-dom';
import { getUserById } from '../../api/users'; 

const AccountSummary = () => {
  const [user, setUser] = useState(data);
  const [notificationPreference, setNotificationPreference] = useState(
    data.preferences.notifications.sms ? 'sms' : 'email'
  );

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(prevUser => ({ ...prevUser, ...userData }));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleNotificationChange = (type) => {
    setNotificationPreference(type);
  };

  const safelyGetNestedProp = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div style={styles.summaryContainer}>
      <h2 style={styles.heading}>Account Summary</h2>
      
      <div style={styles.cardContainer}>
        {/* User Information Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>User Information</h3>
          <div style={styles.infoItem}>
            <span style={styles.label}>Username:</span>
            <span style={styles.value}>{user.username}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{user.email}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Phone Number:</span>
            <span style={styles.value}>{user.phoneNumber}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Role:</span>
            <span style={styles.value}>{user.role}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Account Status:</span>
            <span style={styles.value}>{user.accountStatus}</span>
          </div>
        </div>

        {/* Subscription Details Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>Subscription Details</h3>
          <div style={styles.infoItem}>
            <span style={styles.label}>Status:</span>
            <span style={styles.value}>{user.subscriptionStatus}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Plan:</span>
            <span style={styles.value}>{safelyGetNestedProp(user, 'subscriptionDetails.plan')}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Start Date:</span>
            <span style={styles.value}>{safelyGetNestedProp(user, 'subscriptionDetails.startDate')}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Renewal Date:</span>
            <span style={styles.value}>{safelyGetNestedProp(user, 'subscriptionDetails.renewalDate')}</span>
          </div>
        </div>

        {/* User Stats Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>User Stats</h3>
          <div style={styles.infoItem}>
            <span style={styles.label}>Total Rides:</span>
            <span style={styles.value}>{user.totalRides}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Total Distance (km):</span>
            <span style={styles.value}>{user.totalDistanceKms}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Total Spending:</span>
            <span style={styles.value}>${user.totalSpending.toFixed(2)}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Average Rating:</span>
            <span style={styles.value}>{user.averageRating}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Last Ride:</span>
            <span style={styles.value}>
              {safelyGetNestedProp(user, 'lastRide.date')} - 
              {safelyGetNestedProp(user, 'lastRide.vehicle')} 
              (Driver: {safelyGetNestedProp(user, 'lastRide.driverName')})
            </span>
          </div>
        </div>

        {/* Preferences Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>Preferences</h3>
          <div style={styles.infoItem}>
            <span style={styles.label}>Language:</span>
            <span style={styles.value}>{safelyGetNestedProp(user, 'preferences.language')}</span>
          </div>
          <div style={styles.notificationPreferences}>
            <div style={styles.notificationHeader}>
              <span style={styles.label}>Notification Preferences:</span>
              <select 
                value={notificationPreference}
                onChange={(e) => handleNotificationChange(e.target.value)}
                style={styles.select}
              >
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div style={styles.notificationOptions}>
              <div style={styles.infoItem}>
                <span style={styles.label}>SMS:</span>
                <span style={styles.value}>{notificationPreference === 'sms' ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email:</span>
                <span style={styles.value}>{notificationPreference === 'email' ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/VehicleHistory" style={styles.link}>
         Vehicle Summary
      </Link>
    </div>
  );
};

export default AccountSummary;