import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling
import treeLogo from './tree-logo.svg'; // Adjust path based on your project structure
import flowerImage from './FLOWERIMAGE.webp'; // Adjust path based on your project structure

const Home = () => (
  <div className="home-container">
    <img src={treeLogo} alt="Tree Logo" className="logo" />
    <div className="home-content">
      <h1>Welcome to User Media Storage</h1>
      
      {/* Display flower image before the button */}
      <div className="flower-container">
        <img src={flowerImage} alt="Flower" className="flower-image" />
      </div>

      <div>
        <Link to="/users-with-videos">
          <button>See Users with Videos</button>
        </Link>
      </div>
      
      <div className="button-group">
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;












