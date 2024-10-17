import React from 'react';


function Signup() {
    return (
        <div className="signup-page" style={{
            backgroundImage: "url('C:\Users\avinash\Desktop\ezcars\ezcars-app\src\image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="signup-container" style={{
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
                }}>Sign Up for EzCars</h2>
                <form action="/signup" method="POST" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <label htmlFor="fullname" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Full Name</label>
                    <input type="text" id="fullname" name="fullname" required style={{
                        padding: '10px',
                        marginBottom: '20px',
                        border: '1px solid #958e8d',
                        borderRadius: '5px'
                    }} />

                    <label htmlFor="email" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Email</label>
                    <input type="email" id="email" name="email" required style={{
                        padding: '10px',
                        marginBottom: '20px',
                        border: '1px solid #958e8d',
                        borderRadius: '5px'
                    }} />

                    <label htmlFor="username" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Username</label>
                    <input type="text" id="username" name="username" required style={{
                        padding: '10px',
                        marginBottom: '20px',
                        border: '1px solid #958e8d',
                        borderRadius: '5px'
                    }} />

                    <label htmlFor="password" style={{
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: '#958e8d'
                    }}>Password</label>
                    <input type="password" id="password" name="password" required style={{
                        padding: '10px',
                        marginBottom: '20px',
                        border: '1px solid #958e8d',
                        borderRadius: '5px'
                    }} />

                    <button type="submit" style={{
                        padding: '10px',
                        backgroundColor: '#f97316',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Sign Up</button>
                </form>
                <div className="login-link" style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    color: '#ee3b15'
                }}>
                    <p>Already have an account? <a href="/login" style={{
                        color: '#f97316',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}>Login here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
