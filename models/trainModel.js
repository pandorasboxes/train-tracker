const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    train_name: String,
    type: String,
    status: String,
    speed: Number,
    start_location: String,
    destination: String,
    latitude: Number,
    longitude: Number,
    last_update: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Train', trainSchema);
