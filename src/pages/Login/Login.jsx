import React, { useState } from 'react';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send username and password to your server for verification
        // For example, using fetch or axios to make an API call
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect user or store token
                console.log('Login successful');
            } else {
                setErrorMessage('Invalid username or password');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        });
    };

    return (
        <div className="login-page" style={{
            backgroundImage: "url('image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="login-container" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#f97316'
                }}>Login to EzCars</h2>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <label htmlFor="username" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            border: '1px solid #958e8d',
                            borderRadius: '5px'
                        }}
                    />

                    <label htmlFor="password" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            border: '1px solid #958e8d',
                            borderRadius: '5px'
                        }}
                    />

                    {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

                    <button type="submit" style={{
                        padding: '10px',
                        backgroundColor: '#f97316',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Login</button>
                </form>
                <div className="signup-link" style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    color: '#ee3b15'
                }}>
                    <p>Don't have an account? <a href="/signup" style={{
                        color: '#f97316',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}>Sign up here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;