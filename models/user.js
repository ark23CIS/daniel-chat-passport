const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  githubID: {
    type: String
  },
  facebookID: {
    type: String
  },
  vkontakteID: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
