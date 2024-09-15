const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

// Define the routes
router.get('/trains', trainController.getTrains);  // Example GET route
router.post('/trains', trainController.createTrain);  // Example POST route

module.exports = router;
