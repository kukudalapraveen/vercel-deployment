// ParentComponent.js
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

const ParentComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API or state
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/current-user');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return <Dashboard user={user} />;
};

export default ParentComponent;
