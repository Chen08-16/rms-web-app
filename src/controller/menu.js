const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    return res.json(menuItems);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a menu item
router.post('/', async (req, res) => {
  const { menuid, foodname, image, foodstatus, price } = req.body;
  const newMenu = new Menu({ menuid, foodname, image, foodstatus, price });

  try {
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { foodname, image, foodstatus, price } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { foodname, image, foodstatus, price },
      { new: true }
    );
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
