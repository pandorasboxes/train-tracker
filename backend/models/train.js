const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date },
  },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Train', TrainSchema);
