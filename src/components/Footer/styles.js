const styles = {
    footer: {
        backgroundColor: "#404040",
        color: "#ffffff",
        padding: "20px",
        textAlign: "center",
    },
    footerSections: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap",
        minWidth: "200px",
    },
    section: {
        flex: 1,
        margin: "0 80px",
        padding: "0 20px",
        textAlign: "left",
    },
    sectionTitle: {
        fontSize: "20px",
        marginBottom: "15px",
        fontWeight: "bold",
    },
    linkList: {
        listStyle: "none",
        padding: 0,
    },
    link: {
        color: "#ffffff",
        fontSize: "14px",
        textDecoration: "none",
        marginBottom: "10px",
        display: "block",
    },
    connectLinks: {
        display: "flex",
        justifyContent: "space-between",
        width: "200px",
        marginTop: "10px",
        paddingLeft: "10px",
    },
    iconLink: {
        color: "#fff",
        fontSize: "15px",
        textDecoration: "none",
        transition: "color 0.3s",
    },
    iconLinkHover: {
        color: "#f04",
    },
    copyright: {
        fontSize: "15px",
    },
};

export default styles;
