import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';

function Admin() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(savedReviews);
  }, []);

  const handleRemoveReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  return (
    <div className="admin-container">
      <h2>Submitted Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews submitted yet.</p>
      ) : (
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.productName}</h3>
              {review.productImage && (
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="product-image"
                />
              )}
              <p>Date of Purchase: {review.purchaseDate}</p>
              <p>Date of Review: {review.reviewDate}</p>
              <p>Retailer Name: {review.retailerName}</p>
              <p>Price: ${review.price}</p>
              <p>Feedback: {review.feedback}</p>
              <p>Rating: {review.rating}</p>
              <button
                onClick={() => handleRemoveReview(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;