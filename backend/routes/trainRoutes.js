const express = require('express');
const router = express.Router();
const Train = require('../models/train');

// Get all trains
router.get('/', async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
});

// Get a train by ID
router.get('/:id', async (req, res) => {
  const train = await Train.findById(req.params.id);
  res.json(train);
});

// Update train location
router.post('/:id/location', async (req, res) => {
  const { latitude, longitude, timestamp } = req.body;
  const train = await Train.findByIdAndUpdate(req.params.id, { currentLocation: { latitude, longitude, timestamp } }, { new: true });
  res.json(train);
});

module.exports = router;
