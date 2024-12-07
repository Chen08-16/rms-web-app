const express = require('express');
const User = require('../models/User'); // Adjust path to the schema
const router = express.Router();

// Get user by email
router.get('/users/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/users/:email', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update user profile
// Update User Method
router.put('/update-profile', async (req, res) => {
  const { uid, username, dateOfBirth, phoneNumber } = req.body;

  if (!uid || !username || !dateOfBirth || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { username, dob: new Date(dateOfBirth), phone: phoneNumber },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
