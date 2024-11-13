import React from 'react';
import styles from './styles';

const Contact = () => {
  return (
    <div style={styles.container}>
      <section style={styles.contactInfoSection}>
        <h1 style={styles.heading}>Get in Touch</h1>
        <p style={styles.text}>
          We’d love to hear from you! For any questions or assistance, reach out to us.
        </p>
        <div style={styles.infoWrapper}>
          <div style={styles.infoItem}>
            <h2 style={styles.subheading}>Contact Information</h2>
            <p>Email: ezcarsrent@gmail.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div style={styles.infoItem}>
            <h2 style={styles.subheading}>Location</h2>
            <p>123 EZ Street, Suite 456</p>
            <p>Car City, CA 90001</p>
          </div>
        </div>
      </section>

      <section style={styles.formSection}>
        <h2 style={styles.subheading}>Send Us a Message</h2>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} required />
          <input type="email" placeholder="Your Email" style={styles.input} required />
          <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </section>

      <section style={styles.whyChooseUsSection}>
        <h2 style={styles.subheading}>Why Choose EzCars?</h2>
        <ul style={styles.benefitsList}>
          <li style={styles.benefitItem}>Wide range of vehicles to suit every need</li>
          <li style={styles.benefitItem}>Competitive pricing and flexible plans</li>
          <li style={styles.benefitItem}>24/7 customer support for a hassle-free experience</li>
          <li style={styles.benefitItem}>Easy booking and seamless process from start to finish</li>
        </ul>
      </section>
    </div>
  );
};

export default Contact;
