// client/src/components/UploadVideo.js
import React, { useState } from 'react';
import { uploadVideo } from '../utils/videoUpload'; // Adjust import path

const UploadVideo = ({ username }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadVideo(file, username);
        setUploadStatus('Video uploaded successfully!');
      } catch (error) {
        setUploadStatus('Error uploading video.');
      }
    } else {
      setUploadStatus('No file selected.');
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default UploadVideo;
