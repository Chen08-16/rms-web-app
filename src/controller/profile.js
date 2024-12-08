const express = require('express');
const User = require('../models/User'); // Adjust path to the schema
const router = express.Router();

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
// Update User Method
router.put('/update-profile', async (req, res) => {
  const { uid, userName:username, dateOfBirth:dob, phone,email } = req.body;

  if (!uid || !username || !dateOfBirth || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {

    const user = await User.find({uid,email})
    if (!user) {
      // return res.status(404).json({ error: 'User not found' });
      await Account.create({ uid, username: userName, dob, email , phone })
    }
    const updatedUser = await User.findOneAndUpdate(
      { uid, email },
      { username, dob: new Date(dateOfBirth), phone },
      { new: true } // Return the updated document
    );


    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
