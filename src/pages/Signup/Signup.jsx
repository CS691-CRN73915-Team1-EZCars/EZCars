import React, { useState } from 'react';
import { createUser } from '../../api/users'; // Adjust the import path as needed
import styles from './styles';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        role: 'Customer',
        subscriptionStatus: 'Normal'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await createUser({
                ...formData,
                passwordHash: formData.password // Note: Hashing should be done on the server side
            });
            console.log('Signup successful', response);
            setSuccess('Signup successful! You can now log in.');
            // Optionally, redirect to login page after a delay
            // setTimeout(() => window.location.href = '/login', 3000);
        } catch (error) {
            console.error('Signup error', error);
            setError(error.message || 'An error occurred during signup. Please try again.');
        }
    };

    return (
        <div style={styles.signupPage}>
            <div style={styles.signupContainer}>
                <h2 style={styles.heading}>Sign Up for EzCars</h2>
                {error && <p style={styles.errorMessage}>{error}</p>}
                {success && <p style={styles.successMessage}>{success}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required 
                        style={styles.input} 
                    />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                        style={styles.input} 
                    />

                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        style={styles.input} 
                    />

                    <label htmlFor="phoneNumber" style={styles.label}>Phone Number</label>
                    <input 
                        type="tel" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required 
                        style={styles.input} 
                    />

                    <label htmlFor="role" style={styles.label}>Role</label>
                    <select 
                        id="role" 
                        name="role" 
                        value={formData.role}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <label htmlFor="subscriptionStatus" style={styles.label}>Subscription Status</label>
                    <select 
                        id="subscriptionStatus" 
                        name="subscriptionStatus" 
                        value={formData.subscriptionStatus}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Premium">Premium</option>
                    </select>

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