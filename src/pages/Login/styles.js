const styles = {
    loginPage: {
        backgroundImage: "url('image.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#f97316'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#958e8d'
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #958e8d',
        borderRadius: '5px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#f97316',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center'
    },
    signupLink: {
        textAlign: 'center',
        marginTop: '15px',
        color: '#ee3b15'
    },
    signupAnchor: {
        color: '#f97316',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default styles;