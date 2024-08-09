const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/email'); // Ensure this is correctly implemented
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Function to create directories if they don't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '..', 'uploads');
const videoDir = path.join(__dirname, '..', 'videos');
ensureDirectoryExists(uploadDir);
ensureDirectoryExists(videoDir);
// Register route
router.post('/register', async (req, res) => {
  const { firstName,lastName, email, phoneNumber } = req.body;
    const userPassword = (firstName.slice(0,4)+lastName.slice(0,4)+phoneNumber.slice(0,4)).replaceAll(" ","") 
   const encrytpedPassword = await bcrypt.hash(userPassword, 10)
  try {
    console.log("user registraion under processs")
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      encrytpedPassword,
    });

    await user.save();

    

    // Send welcome email
    await sendEmail(email, 'Welcome!', `Thanks for registering!,\n\n\nYour UserName is ${firstName} and password is ${userPassword}`);
    // const emailResponse = await sendEmail(email, subject, text);
    user.password = userPassword
    user.userPassword=userPassword;
    // res.json({ token,firstName,password:userPassword,email });
    res.json(user);
  } catch (err) {
    console.error(err,"user registeration failed");
    res.status(500).json({ msg: 'Server error' });
  }



});

router.post('/login', async (req, res) => {
  const { firstName, password } = req.body;
  console.log(firstName,password,"emailpassswordddddddddd")
  try {
    // Check if user exists
    const user = await User.findOne({ firstName });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Check password
    const isMatch =await bcrypt.compare(password, user.encrytpedPassword);;
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

  

    // Respond with user info
    res.json({  firstName: user.firstName, email:user.email,profileImage:user.profileImage });
  } catch (err) {
    console.error(err, "Login failed");
    res.status(500).json({ msg: 'Server error' });
  }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Destination directory for images:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { username } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Update the user's profile with the image path
    const user = await User.findOneAndUpdate(
      { firstName: username },
      { $set: { profileImage: file.filename } }, // Save only the filename
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Image uploaded successfully', user });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to handle user info retrieval
router.get('/user/:firstName', async (req, res) => {
  try {
    const user = await User.findOne({ firstName: req.params.firstName });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to handle bio update
router.put('/user/:firstName/bio', async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await User.findOneAndUpdate(
      { firstName: req.params.firstName },
      { $set: { bio } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error updating bio:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Set up multer for video uploads
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Destination directory for videos:', videoDir);
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    // Check if the file is a video
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
});

// Route to handle video upload
router.post('/upload-video', uploadVideo.single('video'), async (req, res) => {
  try {
    const { username } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const user = await User.findOneAndUpdate(
      { firstName: username },
      { $push: { videos: file.filename } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Video uploaded successfully', user });
  } catch (err) {
    console.error('Error uploading video:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to handle retrieving user videos
router.get('/user/:firstName/videos', async (req, res) => {
  try {
    const user = await User.findOne({ firstName: req.params.firstName });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.videos); // Return the list of videos
  } catch (err) {
    console.error('Error fetching user videos:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Example Express route in your backend
router.get('/users-with-videos', async (req, res) => {
  try {
    const usersWithVideos = await User.find({ videos: { $exists: true, $not: { $size: 0 } } });
    res.json(usersWithVideos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users with videos' });
  }
});



// Update user details (firstName, lastName, email)
router.put('/user/:username/details', async (req, res) => {
  const { username } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    // Find the user by username
    let user = await User.findOne({ firstName: username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user's details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    // Save the updated user to the database
    await user.save();

    // Return the updated user (you can customize the response as needed)
    res.json({ user });
  } catch (err) {
    console.error('Error updating user details:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
