import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users'; 
import styles from './styles';

function Signup() {
    const navigate = useNavigate();
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
                passwordHash: formData.password 
            });
            console.log('Signup successful', response);
            setSuccess('Signup successful! Redirecting to Login page...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Signup error:', error);
            console.log('Error details:', JSON.stringify(error, null, 2));
    
            let errorMessage = 'An error occurred during signup. Please try again.';
    
            if (error.response) {
                console.log('Error response:', JSON.stringify(error.response, null, 2));
                errorMessage = error.response.data?.message || error.response.data || error.message || errorMessage;
            } else if (error.request) {
                console.log('Error request:', JSON.stringify(error.request, null, 2));
                errorMessage = 'No response received from the server. Please try again.';
            } else {
                console.log('Error message:', error.message);
                errorMessage = error.message || errorMessage;
            }
    
            if (typeof errorMessage === 'string') {
                if (errorMessage.includes('Duplicate entry')) {
                    if (errorMessage.includes(formData.username)) {
                        setError('This username is already taken.');
                    } else if (errorMessage.includes(formData.email)) {
                        setError('This email is already registered.');
                    } else if (errorMessage.includes(formData.phoneNumber)) {
                        setError('This phone number is already registered.');
                    } else {
                        setError('This information is already registered.');
                    }
                } else {
                    setError(errorMessage);
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
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