import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageMessage, setImageMessage] = useState('');
  const [videoMessage, setVideoMessage] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/uploads/${user.profileImage}`);
    }
    if (user?.bio) {
      setBio(user.bio);
    }
  
    const fetchUserVideos = async () => {
      if (!user?.firstName) return;
  
      try {
        const res = await axios.get(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/user/${user.firstName}/videos`);
        console.log('Fetched videos:', res.data);  // Log the response data
  
        // Check if the response data is an array
        if (Array.isArray(res.data)) {
          // Assuming the API returns an array of video file names or paths
          const videoUrls = res.data.map(video => `https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/videos/${video}`);
          setVideos(videoUrls);
        } else {
          console.error('Unexpected response structure:', res.data);
          setError('Unexpected response structure');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos');
      }
    };
  
    fetchUserVideos();
  }, [user]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', user?.firstName || '');

    setIsLoading(true);

    try {
      const res = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileImage(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/uploads/${res.data.user.profileImage}`);
      setImageMessage('Image uploaded successfully');
      setError('');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
      setImageMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const onVideoUpload = async () => {
    if (!videoFile) {
      setError('Please select a video to upload');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('username', user?.firstName || '');

    setIsVideoLoading(true);

    try {
      const res = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update videos list after successful upload
      setVideos(prevVideos => [
        ...prevVideos,
        `https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/videos/${res.data.user.videos.slice(-1)[0]}`
      ]);
      setVideoMessage('Video uploaded successfully');
      setError('');
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video');
      setVideoMessage('');
    } finally {
      setIsVideoLoading(false);
    }
  };

  const onBioChange = (e) => {
    setBio(e.target.value);
  };

  const saveBio = async () => {
    try {
      const res = await axios.put(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/user/${user?.firstName}/bio`, { bio });
      setBio(res.data.bio);
      setImageMessage('Bio updated successfully');
      setIsBioEditing(false);
    } catch (err) {
      console.error('Error updating bio:', err);
      setError('Failed to update bio');
      setImageMessage('');
    }
  };

  const saveUserDetails = async () => {
    try {
       await axios.put(`https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/user/${user?.firstName}/details`, {
        firstName,
        lastName,
        email,
      });

      setIsEditing(false);
      setImageMessage('User details updated successfully');
    } catch (err) {
      console.error('Error updating user details:', err);
      setError('Failed to update user details');
    }
  };

  const togglePlayPause = (videoElement) => {
    if (videoElement.paused) {
      videoElement.play().catch((error) => console.error('Error attempting to play:', error));
    } else {
      videoElement.pause();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user-section">
        <div className="user-icon-container">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="user-icon" />
          ) : (
            <div className="default-icon">No Profile Image</div>
          )}
        </div>
        <div className="welcome-container">
          <h2>Welcome {firstName || '!'}</h2>
        </div>

        <div className="user-details-section">
          {!isEditing ? (
            <>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <button onClick={() => setIsEditing(true)}>Edit Details</button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button onClick={saveUserDetails}>Save Details</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
        </div>

        <div className="upload-section">
          <div className="upload-section-content">
            <input type="file" accept="image/*" onChange={onFileChange} />
            <button onClick={onUpload} disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
          {imageMessage && <p className="success-message">{imageMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="bio-section">
          <div className="bio-content">
            {!isBioEditing ? (
              <>
                <p className="user-bio">{bio}</p>
                <button onClick={() => setIsBioEditing(true)}>Edit Bio</button>
              </>
            ) : (
              <>
                <textarea
                  className="bio-textarea"
                  value={bio}
                  onChange={onBioChange}
                />
                <button onClick={saveBio}>Save Bio</button>
                <button onClick={() => setIsBioEditing(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>

        <div className="video-grid">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div className="video-item" key={index}>
                <video
                  width="320"
                  height="240"
                  controls
                  onClick={(e) => togglePlayPause(e.target)}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* <video width="320" height="240" controls>
  <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video> */}
              </div>
            ))
          ) : (
            <p className="no-videos-message">No Videos Available</p>
          )}
        </div>

        <div className="video-upload-section">
          <div className="video-upload-section-content">
            <input type="file" accept="video/*" onChange={onVideoFileChange} />
            <button onClick={onVideoUpload} disabled={isVideoLoading}>
              {isVideoLoading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
          {videoMessage && <p className="success-message">{videoMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
