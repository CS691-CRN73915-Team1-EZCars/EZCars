import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

// Mock localStorage for testing purposes
beforeEach(() => {
    localStorage.setItem('username', 'TestUser');
    localStorage.setItem('token', 'test-token'); // Simulate user is logged in
});

afterEach(() => {
    localStorage.clear();
});

test('displays the correct username when user is logged in', async () => {
    // Use `act` to wrap the render method
    await act(async () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });

    // Check if the username is displayed
    const usernameElement = screen.getByText(/Welcome, TestUser!/i);
    expect(usernameElement).toBeInTheDocument();
});

test('does not display username when user is logged out', async () => {
    // Clear the token to simulate logged-out state
    localStorage.removeItem('token');

    // Use `act` to wrap the render method
    await act(async () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });

    // Check that the username is not displayed and login/signup buttons are visible
    expect(screen.queryByText(/Welcome, TestUser!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
