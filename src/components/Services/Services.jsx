import React, { useState, useEffect } from 'react';
import styles from './styles';
import services from '../../data/services.json';

const Services = () => {
  const [loadedIcons, setLoadedIcons] = useState({});

  useEffect(() => {
    const importAll = (r) => {
      let icons = {};
      r.keys().forEach((item) => { icons[item.replace('./', '')] = r(item); });
      return icons;
    };
    
    const icons = importAll(require.context('../../assets/images/servicesSection', false, /\.(png|jpe?g|svg|webp|avif)$/));
    
    const loadedIcns = {};
    services.forEach(service => {
      const iconName = service.icon.split('/').pop();
      loadedIcns[service.id] = icons[iconName];
    });

    setLoadedIcons(loadedIcns);
  }, []);

  return (
    <div style={styles.servicesSection}>
      <div style={styles.headingContainer}>
        <h2 style={styles.heading}>We're BIG on what</h2>
        <h2 style={styles.heading}>matters to you</h2>
      </div>
      <div style={styles.servicesContainer}>
        {services.map(service => (
          <div key={service.id} style={styles.serviceCard}>
            <img 
              src={loadedIcons[service.id]} 
              alt={service.title} 
              style={styles.serviceCardImage} 
            />
            <h3 style={styles.serviceTitle}>{service.title}</h3>
            <p style={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;