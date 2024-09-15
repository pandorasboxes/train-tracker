const Train = require('../models/trainModel');

// Get all trains
exports.getTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new train
exports.createTrain = async (req, res) => {
  const { train_name, engine_model, engine_id, last_station, start_location, destination, speed, latitude, longitude, time_stamp } = req.body;

  const newTrain = new Train({
    train_name,
    engine_model,
    engine_id,
    last_station,
    start_location,
    destination,
    speed,
    latitude,
    longitude,
    time_stamp,
  });

  try {
    const savedTrain = await newTrain.save();
    res.status(201).json(savedTrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
