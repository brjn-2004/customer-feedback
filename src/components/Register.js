import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css'; // Ensure you have your scoped CSS

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setPopupMessage('User already exists with this email!');
    } else {
      users.push({ username, password, email });
      localStorage.setItem('users', JSON.stringify(users));
      setPopupMessage('Registration successful! You can now login.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
    }

    // Clear the popup message after 3 seconds
    setTimeout(() => setPopupMessage(''), 3000);
  };

  return (
    <div className="register-container">
      <h1>Review Hub</h1>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="popup">{popupMessage && <p>{popupMessage}</p>}</div>
      <div className="login-link">
        <p>Already a user?</p>
        <Link to="/login">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;