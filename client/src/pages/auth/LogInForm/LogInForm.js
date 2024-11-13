import React, { useState } from 'react';
import './LogInForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate unique deviceId and deviceName
  const deviceId = localStorage.getItem('deviceId') || generateUniqueDeviceId();
  const deviceName = navigator.userAgent;  

  // Store device ID in localStorage to persist across sessions
  if (!localStorage.getItem('deviceId')) {
    localStorage.setItem('deviceId', deviceId);
  }

  // Utility to generate a unique device ID
  function generateUniqueDeviceId() {
    return 'device-' + Math.random().toString(36).substr(2, 9); 
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Make API request to login with device info
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
        deviceId,
        deviceName,
        phoneNumber,  
      });

      console.log('Login successful:', response.data);
      alert('Login successful!');
      

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone Number (for 2FA):</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      <Link to='/register'>New User? Create An Account</Link>
    </div>
    </div>
  );
};

export default LogInForm;
