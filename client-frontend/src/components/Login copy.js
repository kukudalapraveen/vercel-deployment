import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/login', formData);
      console.log('Login successful:', res.data);

      // Display success message
      setMessage('User logged in successfully');
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
if (err.response) {
      switch (err.response.status) {
        case 400:
          // Check the error message to determine if it's due to email or password
          if (err.response.data.msg === 'User does not exist') {
            setError('Email does not exist. Please check your email or register.');
          } else if (err.response.data.msg === 'Invalid credentials') {
            setError('Incorrect password. Please check your password.');
          } else {
            setError('Login failed. Please try again.');
          }
          break;
        default:
          setError('Login failed. Please try again.');
          break;
      }
    } else {
      setError('Login failed. Please check your network connection.');
    }
    setMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
