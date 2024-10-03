import React from 'react';
import styles from './styles'; 

// Importing icon images
import wideSelectionIcon from '../../assets/images/wide-selection.png';
import transparentPricingIcon from '../../assets/images/transparent-pricing.png';
import supportIcon from '../../assets/images/support.png';
import easyFastIcon from '../../assets/images/easy-fast.jfif';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Wide Selection",
      description: "Our stress-free finance department can find financial solutions to save you money.",
      icon: wideSelectionIcon, // Add icon for Wide Selection
    },
    {
      id: 2,
      title: "Transparent Pricing",
      description: "We offer clear and competitive pricing with no hidden fees.",
      icon: transparentPricingIcon, // Add icon for Transparent Pricing
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to assist you.",
      icon: supportIcon, // Add icon for 24/7 Support
    },
    {
      id: 4,
      title: "Easy and Fast",
      description: "Our streamlined process ensures a quick and hassle-free experience.",
      icon: easyFastIcon, // Add icon for Easy and Fast
    },
  ];

  // Basic inline styles as a fallback
  const fallbackStyles = {
    servicesSection: {
      padding: '20px 60px',
      backgroundColor: '#f0f0f0',
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
      textAlign: 'center', // Center text and icons
    },
    icon: {
      width: '50px', // Set the size for the icons
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
            <img 
              src={service.icon} 
              alt={service.title} 
              style={fallbackStyles.icon} 
            />
            <h3 style={{ color: '#444', marginBottom: '10px' }}>{service.title}</h3>
            <p style={{ color: '#666' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
