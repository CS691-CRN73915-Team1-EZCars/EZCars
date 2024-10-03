import React from 'react';
import styles from './styles'; 
import annaImage from '../../assets/images/reviewSection/anna.jpg';
import lauraImage from '../../assets/images/reviewSection/lauraImage.jfif';
import michaelImage from '../../assets/images/reviewSection/michaelImage.webp';

const profileImages = {
  1: annaImage,
  2: lauraImage,
  3: michaelImage,
};

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

const Reviews = () => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? 'orange' : '#ccc' }}>
        ★
      </span>
    ));
  };

  return (
    <div style={styles.reviewsSection}>
      <h2 style={styles.heading}>Ratings and Reviews</h2>
      <div style={styles.reviewsContainer}>
        {reviews.map(review => (
          <div key={review.id} style={styles.reviewCard}>
            <div style={styles.starsContainer}>
              {renderStars(review.rating)}
            </div>
            <p style={styles.reviewText}>{review.text}</p>
            <div style={styles.reviewerInfo}>
              <img 
                src={profileImages[review.id]} 
                alt={`${review.name}'s profile`} 
                style={styles.reviewerInfoImage} 
              />
              <div>
                <strong>{review.name}</strong>
                <p style={styles.reviewerRole}>{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;