const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String },
//   username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number  },
  encrytpedPassword: {type: String, required: true},
    profileImage: { type: String }, // Path to the profile image
    bio: { type: String, default: '',maxlength: 500 }, // Add bio field
    videos: [String]

});

module.exports = mongoose.model('User', UserSchema);
