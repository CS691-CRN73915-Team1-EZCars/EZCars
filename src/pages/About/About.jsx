import React from 'react';
import styles from './styles';

const About = () => {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.heroHeading}>About EzCars</h1>
        <p style={styles.heroText}>
          Dedicated to delivering the best car rental experience for our customers, wherever they are headed.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Our Story</h2>
        <p style={styles.sectionText}>
          Founded with a mission to simplify car rentals, EzCars provides a streamlined, customer-first experience. We’re here to help you find the perfect vehicle for every journey, be it business or leisure.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Our Mission</h2>
        <p style={styles.sectionText}>
          To offer reliable, accessible, and flexible car rental options that fit your unique needs and ensure a seamless experience.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Our Values</h2>
        <ul style={styles.valuesList}>
          <li style={styles.valueItem}><strong>Customer Commitment:</strong> We prioritize every customer interaction to ensure satisfaction.</li>
          <li style={styles.valueItem}><strong>Integrity:</strong> Transparency and honesty are at the heart of all our interactions.</li>
          <li style={styles.valueItem}><strong>Quality:</strong> We maintain our vehicles and services to the highest standards.</li>
          <li style={styles.valueItem}><strong>Community:</strong> Supporting local communities is an essential part of who we are.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
