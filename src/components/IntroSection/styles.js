const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '30px 0 50px 80px',
        maxWidth: '1200px',
        marginBottom: '40px',
        marginLeft: '30px',
        position: 'relative', // Add this to allow absolute positioning of the image
        overflow: 'hidden', // Ensure the image doesn't cause horizontal scrolling
    },
    textSection: {
        flex: '0 1 38%', // Adjust this value to control text section width
        paddingRight: '20px',
        zIndex: 1, // Ensure text is above the image if they overlap
    },
    heading: {
        fontSize: '53px',
        fontWeight: 'bold',
        color: '#000',
        lineHeight: '1.2',
        marginBottom: '20px'
    },
    headingLine: {
        display: 'block',
    },
    highlight: {
        color: '#f7931e'
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#555'
    },
    imageSection: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '40%', // Adjust as needed
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    carImage: {
        height: '360px',
        borderTopLeftRadius: '100px',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        borderBottomLeftRadius: '0',
        objectFit: 'cover',
        objectPosition: 'left center',
        
    }
};

export default styles;