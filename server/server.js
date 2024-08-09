const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Import auth routes
const authRoutes = require('./routes/auth');
// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.use('/',(req,res)=>{
  res.send(`Backend server running on port:${PORT}`)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
