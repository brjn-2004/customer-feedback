import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        {loggedInUser && <p className="user-greeting">Hello, {loggedInUser.username}!</p>}
        {loggedInUser && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
      <h1>Welcome to the Customer Feedback Platform</h1>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/add-review')}>
          <h2>Create Your Feedback</h2>
        </div>
        <div className="card" onClick={() => navigate('/admin')}>
          <h2>Show Your Feedbacks</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;