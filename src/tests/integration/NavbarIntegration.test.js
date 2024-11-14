import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

// Mock localStorage for testing purposes
beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn((key) => null),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });

    // Set initial values in localStorage
    localStorage.setItem('username', 'TestUser');
    localStorage.setItem('token', 'test-token'); // Simulate user is logged in
});

afterEach(() => {
    localStorage.clear();
});

test('displays the correct username when user is logged in', () => {
    render(
        <Router>
            <Navbar />
        </Router>
    );


});

test('does not display username when user is logged out', () => {
    localStorage.removeItem('token'); // Simulate logged-out state

    render(
        <Router>
            <Navbar />
        </Router>
    );

    expect(screen.queryByText(/Welcome, TestUser!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});