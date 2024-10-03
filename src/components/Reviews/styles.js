const styles = {
  reviewsSection: {
    padding: '20px 50px',
    textAlign: 'left',
    backgroundColor: "#f0f0f0", // Light grey background
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    color: '#333',
    marginTop: '40px',
    marginLeft: '100px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  reviewsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '80px', // Consistent spacing between cards
    margin: '45px auto', // Center the container
  },
  reviewCard: {
    width: '380px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'left',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '200px', // Fixed height for consistency
  },
  starsContainer: {
    marginBottom: '10px',
  },
  reviewText: {
    marginBottom: '10px',
    flexGrow: 1, // Allow text to fill available space
    overflow: 'auto', // Add scrollbar if text is too long
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  reviewerInfoImage: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    marginRight: '10px',
    objectFit: 'cover',
  },
  reviewerRole: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
};

export default styles;