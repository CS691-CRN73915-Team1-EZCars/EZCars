import React, { useState } from 'react';
import styles from './styles';
import data from '../../data/userData.json';
import { Link } from 'react-router-dom';

const AccountSummary = () => {
  const user = data;
  const [notificationPreference, setNotificationPreference] = useState(
    user.preferences.notifications.sms ? 'sms' : 'email'
  );

  const handleNotificationChange = (type) => {
    setNotificationPreference(type);
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
            <span style={styles.value}>{user.subscriptionDetails.plan}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Start Date:</span>
            <span style={styles.value}>{user.subscriptionDetails.startDate}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Renewal Date:</span>
            <span style={styles.value}>{user.subscriptionDetails.renewalDate}</span>
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
            <span style={styles.value}>{`${user.lastRide.date} - ${user.lastRide.vehicle} (Driver: ${user.lastRide.driverName})`}</span>
          </div>
        </div>

        {/* Preferences Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>Preferences</h3>
          <div style={styles.infoItem}>
            <span style={styles.label}>Language:</span>
            <span style={styles.value}>{user.preferences.language}</span>
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