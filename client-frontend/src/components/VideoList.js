// client/src/components/VideoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoList = ({ username }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/user/${username}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, [username]);

  return (
    <div>
      <h1>Your Videos</h1>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <video width="320" height="240" controls>
              <source src={`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/videos/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
