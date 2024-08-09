import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersWithVideos = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/users-with-videos');
        setUsers(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users with videos:', err);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleShowAllVideos = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, showAll: true }
          : user
      )
    );
  };

  return (
    <div>
      <h1>Users with Videos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={{ marginBottom: '20px' }}>
            {/* Line 1: Display the user's first name on the left */}
            <h2 style={{ textAlign: 'left' }}>{user.firstName}</h2>
            {/* Line 2: Display up to 4 videos */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(user.showAll ? user.videos : user.videos.slice(0, 4)).map((video, index) => (
                <div key={index} style={{ flex: '1 0 21%', maxWidth: '21%' }}>
                  <video width="100%" controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
            {/* Show All button if there are more than 4 videos */}
            {!user.showAll && user.videos.length > 4 && (
              <button onClick={() => handleShowAllVideos(user.id)}>Show All</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UsersWithVideos;
