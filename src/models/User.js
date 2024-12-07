const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  uid: { type: String, required: true },
  username: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);