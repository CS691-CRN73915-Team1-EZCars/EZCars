// Footer.js
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import styles from "./styles";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerSections}>
                {/* Company Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Company</h3>
                    <ul style={styles.linkList}>
                        <li><a href="/" style={styles.link}>About Us</a></li>
                        <li><a href="/" style={styles.link}>Services</a></li>
                        <li><a href="/" style={styles.link}>Terms</a></li>
                        <li><a href="/" style={styles.link}>Contact Us</a></li>
                        <li><a href="/" style={styles.link}>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Quick Links Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Quick Links</h3>
                    <ul style={styles.linkList}>
                        <li><a href="/" style={styles.link}>Get in Touch</a></li>
                        <li><a href="/" style={styles.link}>Help Center</a></li>
                        <li><a href="/" style={styles.link}>How it works</a></li>
                    </ul>
                </div>

                {/* Connect with Us Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Connect with Us</h3>
                    <div style={styles.connectLinks}>
                        <a href="https://facebook.com" style={styles.iconLink}><FaFacebookF /></a>
                        <a href="https://twitter.com" style={styles.iconLink}><FaTwitter /></a>
                        <a href="https://instagram.com" style={styles.iconLink}><FaInstagram /></a>
                        <a href="https://linkedin.com" style={styles.iconLink}><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} All Rights Reserved. Developed & Designed by EzCars Team
            </div>
        </footer>
    );
};

export default Footer;