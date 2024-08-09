// client/src/utils/videoUpload.js
import axios from 'axios';

export const uploadVideo = async (videoFile, username) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('username', username);

  try {
    const response = await axios.post('https://vercel-deployment-server-9v6rptl9y-praveens-projects-6e7bc319.vercel.app/api/auth/upload-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Video uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error; // Rethrow error for handling in the calling component
  }
};
