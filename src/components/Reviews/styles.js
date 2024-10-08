const styles = {
  reviewsSection: {
    padding: '30px 80px',
    textAlign: 'left',
    backgroundColor: "#f0f0f0", // Light grey background
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
  },
  heading: {
    color: '#333',
    marginTop: '40px',
    margin: '25px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  reviewsContainer: {
    display: 'grid',
    gridTemplateColumns: "repeat(3, 1fr)",
    margin: '25px 0', // Changed from '25px' to '25px 0'
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '10px',
    gap: '20px', 
  },
  reviewCard: {
    
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
  leaveReviewButton: {
    width: '100%',
    padding: '15px',
    margin: '25px 0',
    backgroundColor: '#f97316', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default styles;