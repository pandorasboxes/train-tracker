const express = require('express');
const mongoose = require('mongoose');
const trainRoutes = require('./routes/trainRoutes');
const { startSimulation } = require('./services/trainService');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder
app.use('/api', trainRoutes); // Serve API routes

// Serve index.html from public folder for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/train-tracker').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Start the train simulation
startSimulation();

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
