const styles = {
    catalog: {
      textAlign: 'left', // Align text to the left for the catalog section
      paddingTop: '20px',
      paddingBottom: '20px',
      marginBottom: '35px',
      marginTop: '30px',
      marginLeft: '15px',
      paddingLeft: '80px',
      paddingRight: '80px',
      
    },
    heading: {
      fontSize: '24px',
      textAlign: 'left',
    },
    brandContainer: {
      display: 'flex',
      justifyContent: 'space-between', // Start from the left
      flexWrap: 'wrap',
      gap: '20px', // Add consistent spacing between items
    },
    brand: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     // margin: '15px',
    },
    brandImage: {
        width: '70px',
        height: '70px', 
        marginBottom: '10px',
    },
    brandName: {
      fontSize: '16px',
      margin: '0',
    },
  };
  
  export default styles;
  