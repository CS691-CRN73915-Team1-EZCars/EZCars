export const styles = {
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
        marginTop: '20px',
    },

    bookingCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },

    bookingDetail: {
        marginBottom: '5px',
    },

    label: {
        fontWeight: 'bold',
        color: '#7f8c8d',
        marginRight: '5px',
    },

    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },

    paginationButton: {
        backgroundColor: '#f97316', 
        color: '#ffffff', 
        padding: '10px 20px', 
        fontSize: '16px', 
        fontWeight: 'bold', 
        borderRadius: '5px', 
        border: 'none', 
        cursor: 'pointer', 
        marginLeft:'10px', 
        transition:'background-color 0.3s ease', 
    },

    pageInfo: {
        fontSize: '16px', 
        fontWeight:'bold', 
        color:'#2c3e50', 
    },

    modalOverlay: {
      position:'fixed', 
      top :0, left :0, right :0, bottom :0,
      backgroundColor :'rgba(0,0,0,.7)', display :'flex' ,
      justifyContent :'center' , alignItems :'center' ,
      zIndex :1000
   },
  
   modalContent:{
     backgroundColor :'#ffffff' , padding :'30px' ,
     borderRadius :'8px' , maxWidth :'800px' , width :'90%' ,
     maxHeight :'80vh' , overflowY :'auto' ,
     boxShadow :'0 4px 6px rgba(0,0,0,.1)'
   },
  
   modalTitle:{
     color :'#f97316' , fontSize :'24px' ,
     marginBottom :'20px' , textAlign :'center'
   },
  
   modalBody:{
     display :'flex' , flexDirection :'column'
   },
  
   closeButton:{
     backgroundColor:'#3498db' , color:'#ffffff' ,
     padding:'10px 20px' , fontSize:'16px' ,
     fontWeight:'bold' , border:'none' ,
     borderRadius:'5px' , cursor:'pointer' ,
     marginTop :20 , transition :'background-color .3s ease' ,
   },

   confirmButton:{
      backgroundColor:'#f97316', 
      color:'#ffffff', 
      padding:'10px 20px', 
      fontSize:'16px', 
      fontWeight:'bold', 
      border:'none', 
      borderRadius:'5px', 
      cursor:'pointer', 
      marginRight:'10px', 
      transition:'background-color .3s ease, transform .2s ease'
   },

   cancelButton:{
      backgroundColor:'#3498db', 
      color:'#ffffff', 
      padding:'10px 20px', 
      fontSize:'16px', 
      fontWeight:'bold', 
      border:'none', 
      borderRadius:'5px', 
      cursor:'pointer', 
      transition:'background-color .3s ease, transform .2s ease'
   },

   confirmMessage:{
       fontSize:'16px', 
       fontWeight:'bold', 
       justifyContent:'center', 
       alignItems:'center', 
       display:'flex', 
       margin:'30px'
   },
   
   errorMessage:{
       fontSize:'16px', 
       fontWeight:'bold', 
       justifyContent:'center', 
       alignItems:'center', 
       display:'flex', 
       margin:'30px'
   },
   statusText: {
    fontWeight: 'bold',
  },
};

export default styles;