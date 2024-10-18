import React from 'react';
import styles from './styles';

function Signup() {
    return (
        <div style={styles.signupPage}>
            <div style={styles.signupContainer}>
                <h2 style={styles.heading}>Sign Up for EzCars</h2>
                <form action="/signup" method="POST" style={styles.form}>
                    <label htmlFor="fullname" style={styles.label}>Full Name</label>
                    <input type="text" id="fullname" name="fullname" required style={styles.input} />

                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" id="email" name="email" required style={styles.input} />

                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input type="text" id="username" name="username" required style={styles.input} />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" id="password" name="password" required style={styles.input} />

                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
                <div style={styles.loginLink}>
                    <p>Already have an account? <a href="/login" style={styles.loginAnchor}>Login here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;