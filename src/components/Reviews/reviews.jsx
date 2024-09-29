import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      text: "Excellent service! The booking process was straightforward, and the car was in perfect condition.",
      name: "Anna Smith",
      role: "Business Traveler",
    },
    {
      id: 2,
      text: "The customer service is unbeatable. They helped me find the perfect car for my trip.",
      name: "Laura Johnson",
      role: "Family Traveler",
    },
    {
      id: 3,
      text: "Great variety of vehicles and fair prices. The entire rental experience was very positive.",
      name: "Michael Brown",
      role: "Position, Company name",
    },
  ];

  return (
    <div style={{padding: '20px 60px'}}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Ratings and Reviews</h2>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {reviews.map(review => (
          <div key={review.id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px'}}>
            <p>{review.text}</p>
            <div>
              <strong>{review.name}</strong>
              <p>{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;