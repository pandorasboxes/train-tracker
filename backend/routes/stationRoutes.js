const express = require('express');
const router = express.Router();
const Station = require('../models/station');

// Get all stations
router.get('/', async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

module.exports = router;
