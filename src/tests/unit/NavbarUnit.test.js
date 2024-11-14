import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

test('renders the Navbar title and navigation links', () => {
    // Render Navbar component inside Router
    render(
        <Router>
            <Navbar />
        </Router>
    );

    // Check if the title is displayed
    const titleElement = screen.getByText('EzCars');
    expect(titleElement).toBeInTheDocument();

    // Check if each navigation link is displayed
    const homeLink = screen.getByText('Home');
    const vehiclesLink = screen.getByText('Vehicles');
    const aboutLink = screen.getByText('About Us');
    const contactLink = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    expect(vehiclesLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
});