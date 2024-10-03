const styles = {
  servicesSection: {
    padding: '20px 0',
    backgroundColor: 'white',
    maxWidth: '1400px',
    margin: '35px auto',
  },
  headingContainer: {
    textAlign: 'left',
    marginBottom: '30px',
    //paddingLeft: '60px',
  },
  heading: {
    color: '#333',
    fontSize: '30px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    margin: 0,
  },
  servicesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
   // paddingLeft: '60px',
   // paddingRight: '60px',
  },
  serviceItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '250px', // Fixed width for each item
    padding: '20px',
  },
  serviceIcon: {
    width: '40px',
    height: '40px',
    marginBottom: '15px',
    objectFit: 'contain',
  },
  serviceTitle: {
    color: '#444',
    marginBottom: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#666',
    fontSize: '15px',
    lineHeight: '1.5',
    maxWidth: '200px', // Set a maximum width for the description
    overflowWrap: 'break-word', // Allow text to break within words if necessary
  },
};

export default styles;