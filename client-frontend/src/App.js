import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import axios from 'axios';
import UsersWithVideos from './components/UsersWithVideos';

// Component to fetch user data based on route parameter
const UserFetcher = ({ setUser, setLoading, setError }) => {
  const { firstName } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/user/${firstName}`);
        setUser(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [firstName, setUser, setLoading, setError]);

  return null; // This component does not render anything
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users-with-videos" element={<UsersWithVideos />} />

          <Route
            path="/:firstName/dashboard"
            element={
              <>
                <UserFetcher setUser={setUser} setLoading={setLoading} setError={setError} />
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <Dashboard user={user} />
                )}
              </>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
