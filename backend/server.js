// server.js
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Train Schema
const trainSchema = new mongoose.Schema({
    name: String,
    currentLocation: {
        latitude: Number,
        longitude: Number,
    },
});

const Train = mongoose.model('Train', trainSchema);

// Routes
app.get('/api/trains', async (req, res) => {
    const trains = await Train.find();
    res.json(trains);
});

// WebSocket Server
const wss = new WebSocket.Server({ server: app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', async message => {
        const updatedTrain = JSON.parse(message);
        await Train.findByIdAndUpdate(updatedTrain._id, updatedTrain);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
