import React from 'react';
import styles from './styles'; 

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Wide Selection",
      description: "Our stress-free finance department can find financial solutions to save you money.",
    },
    {
      id: 2,
      title: "Transparent Pricing",
      description: "We offer clear and competitive pricing with no hidden fees.",
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to assist you.",
    },
    {
      id: 4,
      title: "Easy and Fast",
      description: "Our streamlined process ensures a quick and hassle-free experience.",
    },
  ];

  // Basic inline styles as a fallback
  const fallbackStyles = {
    servicesSection: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
    },
    servicesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    serviceCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '250px',
    },
    icon: {
      width: '50px',
      height: '50px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={fallbackStyles.servicesSection} className={styles.servicesSection || ''}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>We're BIG on what matters to you</h2>
      <div style={fallbackStyles.servicesContainer} className={styles.servicesContainer || ''}>
        {services.map(service => (
          <div key={service.id} style={fallbackStyles.serviceCard} className={styles.serviceCard || ''}>
            <h3 style={{ color: '#444', marginBottom: '10px' }}>{service.title}</h3>
            <p style={{ color: '#666' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;