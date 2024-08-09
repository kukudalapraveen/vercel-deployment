// client/src/components/Layout.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-right">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
