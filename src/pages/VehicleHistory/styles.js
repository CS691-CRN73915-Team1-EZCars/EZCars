const styles = {
  summaryContainer: {
    maxWidth: '1250px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
   },

   monthYearPicker:{
     display:'flex',
     gap:'10px'
   },

   filterSelect: {
     padding: '8px',
     borderRadius: '4px',
     border: '1px solid #ccc',
     fontSize: '14px',
   },

   fullPageMessage: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height: '70vh',
     fontSize: '40px',
     color: '#2c3e50',
     backgroundColor: '#f8f9fa',
   },

   bookingHistory: {
     marginTop: '20px'
   },

   bookingCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '1000px',
    marginLeft: 'auto', 
    marginRight: 'auto' 
  },

   bookingContent: {
     display: 'flex'
   },

   imageContainer:{
     flexBasis:'40%',
     marginRight:'20px'
   },

   vehicleImage:{
     width:'100%',
     height:'auto'
   },

   vehicleInfo:{
     flexGrow:'1'
   },

   vehicleName:{
     color:'#f97316', 
     fontWeight:'bold', 
     fontSize:'22px', 
     marginTop:'0', 
     marginBottom:'10px' 
   },

   vehicleDetail:{
       marginBottom:'5px'
   },

   label:{
       fontWeight:'bold', 
       color:'#7f8c8d', 
       marginRight:'5px' 
   },

   bookingDetails:{
       borderTop:'1px solid #e0e0e0', 
       paddingTop:'15px', 
       display:'flex', 
       flexWrap:'wrap', 
       justifyContent:'space-between',
       alignItems: 'flex-end',
   },

   bookingColumn:{
       flexBasis:'48%', 
       marginBottom:'10px'
   },
   buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },

   bookingDetail:{
       marginBottom:'5px',
   },

   bookingStatusRow:{
       display:'flex', 
       justifyContent:'space-between', 
       alignItems:'center', 
       marginTop:'10px'
   },

   bookingDuration:{
       fontWeight:'bold', 
       color:'#27ae60' ,
       marginLeft:'60px'
   },

   bookingStatus:{
       fontWeight:'bold', 
       color:'#27ae60' ,     
   },

   deleteButton: {
    backgroundColor: '#f97316',
    color: '#ffffff',
    padding: '7px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
   // marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  viewBookingButton: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '7px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
   // margin: '10px',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  },
};

export default styles;