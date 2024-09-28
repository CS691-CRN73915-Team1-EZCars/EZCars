// styles.js
const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between", // Space between logo, nav links, and buttons
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#404040",
        color: "#ffffff",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold",
        marginRight: "200px", // Space between logo and links
    },
    navContainer: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1, // Allow navContainer to take available space
        justifyContent: "flex-start", // Align items to the left
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        gap: "50px", // Padding between links
        margin: 0,
        padding: 0,
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
    },
    linkText: {
        fontSize: '16px',
    },
    buttonContainer: {
        display: "flex",
        gap: "10px", // Space between the buttons
    },
    button: {
        padding: "15px 22px",
        backgroundColor: "#f97316",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: 'bold',
        fontSize: '16px',
    },
    buttonLink: {
        color: "#ffffff",
        background: 'transparent',
        border: '0px',
        fontSize: '16px',
    }
};

export default styles;  