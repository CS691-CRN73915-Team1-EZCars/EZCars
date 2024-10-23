import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import styles from './styles';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                navigate('/'); // Redirect to home page
                window.location.reload(); // Refresh the page
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again later.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={styles.loginPage}>
            <div style={styles.loginContainer}>
                <h2 style={styles.heading}>Login to EzCars</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <div style={styles.signupLink}>
                    <p>Don't have an account? <a href="/signup" style={styles.signupAnchor}>Sign up here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;