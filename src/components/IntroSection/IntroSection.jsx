import React from 'react';
import carImage from '../../assets/images/IntroSection.png';
import styles from './styles';

function IntroSection() {
  return (
    <div style={styles.container}>
      <div style={styles.textSection}>
        <h1 style={styles.heading}>
          <span style={styles.headingLine}>Find the</span>
          <span style={styles.headingLine}>Perfect Car</span>
          <span style={styles.headingLine}>
            for <span style={styles.highlight}>Your Trip</span>
          </span>
        </h1>
        <p style={styles.paragraph}>
          Quick, easy, and at the best price. Whether you're planning a 
          weekend getaway or a cross-country adventure, our diverse 
          fleet and exceptional service ensure you get on the road 
          effortlessly.
        </p>
      </div>
      <div style={styles.imageSection}>
        <img src={carImage} alt="Car on the road" style={styles.carImage} />
      </div>
    </div>
  );
}

export default IntroSection;