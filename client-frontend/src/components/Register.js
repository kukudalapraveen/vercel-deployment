import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  
  const [confirmation, setConfirmation] = useState(null); // State for confirmation message
  const navigate = useNavigate(); // Initialize navigate

  const onSubmit = async (e) => {
    e.preventDefault();
let response ={};
    try {
      response = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/register', formData);
      // Assuming the backend returns an object with { firstName, email, password }
      setConfirmation(response.data); // Update confirmation state with data from the backend
    } catch (error) {
      setConfirmation(response.data)
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOk = () => {
    setConfirmation(null); // Clear confirmation message when "OK" is clicked
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      {confirmation && (
        <div className="confirmation-box">
          <p>Hey!!!, Your Registration was Successful!</p>
          <p>First Name: {confirmation.firstName}</p>
          <p>Email: {confirmation.email}</p>
          <p>Your Password has been sent on your email</p>
          <button onClick={handleOk}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Register;
