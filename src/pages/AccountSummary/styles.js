const styles = {
  summaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '75vh',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f0f2f5',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '36px',
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '10px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  },
  sectionHeading: {
    color: '#f97316',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '16px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    color: '#333',
  },
  notificationPreferences: {
    marginTop: '15px',
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  notificationOptions: {
    marginTop: '10px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '14px',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#f97316',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease-in-out',
    alignSelf: 'center',
  },
};

export default styles;