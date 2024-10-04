// src/components/GetStarted.js

import getStartedBg from '../../assets/images/get-started-bg.jpg'; // Adjust the path based on your file structure

// Define and export the styles object
const gs_styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
        justifyContent: 'center',
        height: '100vh',
        maxHeight: '600px', // Set your desired max height here
        backgroundImage: `url(${getStartedBg})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'left', // Align text to the left
        paddingLeft: '20px', // Optional: Add some padding for aesthetics
    },
    button: {
        marginLeft: '50px',
        marginTop: '15px', // Optional: Add some margin for aesthetics
        padding: "15px 22px",
        backgroundColor: "#f97316",
        color: "#ffffff",
        border: "none",
        borderRadius: '6px',
        cursor: "pointer",
        fontWeight: 'bold',
        fontSize: '16px',
    },
    h1: {
        marginBottom: '20px',
        marginLeft: '50px', // Optional: Add some margin for aesthetics
        fontSize: '45px',
        fontWeight: 'Bold',

    },
    p: {
        margin: '0',
        marginLeft: '50px', // Optional: Add some margin for aesthetics
        fontSize: '22px',
        fontWeight: '15px',
    },
};

export default gs_styles; // Export the styles object
