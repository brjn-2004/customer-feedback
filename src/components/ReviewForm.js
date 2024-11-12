import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReviewForm.css';

function ReviewForm() {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [retailerName, setRetailerName] = useState('');
  const [price, setPrice] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewDetails = {
      productName,
      productImage,
      purchaseDate,
      reviewDate: new Date().toLocaleDateString(),
      retailerName,
      price,
      feedback,
      rating,
    };

    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.push(reviewDetails);
    localStorage.setItem('reviews', JSON.stringify(savedReviews));

    alert('Review submitted successfully!');

    setProductName('');
    setProductImage('');
    setPurchaseDate('');
    setRetailerName('');
    setPrice('');
    setFeedback('');
    setRating(0);
  };

  return (
    <div className="review-form-container">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name of the Product:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image of the Product:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>
        <div className="form-group">
          <label>Date of Purchase:</label>
          <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date of Review:</label>
          <input type="text" value={new Date().toLocaleDateString()} readOnly />
        </div>
        <div className="form-group">
          <label>Name of the Retailer:</label>
          <input type="text" value={retailerName} onChange={(e) => setRetailerName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price of the Product:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Feedback of the Product:</label>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Rating for the Product (0-5):</label>
          <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
        <button type="button" onClick={() => navigate('/admin')} className="view-button">View Your Reviews</button>
      </form>
    </div>
  );
}

export default ReviewForm;