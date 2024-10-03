import React from 'react';
import annaImage from '../../assets/images/anna.jpg'; // Update with your image path
import lauraImage from '../../assets/images/lauraImage.jfif'; // Update with your image path
import michaelImage from '../../assets/images/michaelImage.webp'; // Update with your image path

const profileImages = {
  1: annaImage, // Anna's image
  2: lauraImage, // Laura's image
  3: michaelImage, // Michael's image
};

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      text: "Excellent service! The booking process was straightforward, and the car was in perfect condition.",
      name: "Anna Smith",
      role: "Business Traveler",
      rating: 5,
    },
    {
      id: 2,
      text: "The customer service is unbeatable. They helped me find the perfect car for my trip.",
      name: "Laura Johnson",
      role: "Family Traveler",
      rating: 5,
    },
    {
      id: 3,
      text: "Great variety of vehicles and fair prices. The entire rental experience was very positive.",
      name: "Michael Brown",
      role: "Position, Company name",
      rating: 4,
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? 'orange' : '#ccc' }}>
        ★
      </span>
    ));
  };

  return (
    <div style={{ padding: '20px 60px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Ratings and Reviews</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {reviews.map(review => (
          <div 
            key={review.id} 
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              margin: '10px', 
              width: '300px', 
              borderRadius: '5px', 
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              {renderStars(review.rating)}
            </div>
            <p style={{ marginBottom: '10px' }}>{review.text}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={profileImages[review.id]} 
                alt={`${review.name}'s profile`} 
                style={{ 
                  borderRadius: '50%', 
                  width: '40px', // Set a fixed width for the image
                  height: '40px', // Set a fixed height for the image
                  marginRight: '10px' 
                }} 
              />
              <div>
                <strong>{review.name}</strong>
                <p style={{ margin: '0' }}>{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
