const axios = require('axios');

// Coordinates for some key railway stations
const stations = {
  Maradana: { lat: 6.9271, lng: 79.8612 },
  Mirigama: { lat: 7.2427, lng: 80.1270 },
  Anuradhapura: { lat: 8.3450, lng: 80.4170 },
  Vavuniya: { lat: 8.7549, lng: 80.4976 },
  Kandy: { lat: 7.2906, lng: 80.6337 },
  Badulla: { lat: 6.9843, lng: 81.0550 },
  Jaffna: { lat: 9.6615, lng: 80.0255 },
  Kankesanthurai: { lat: 9.7930, lng: 80.0690 },
  Galle: { lat: 6.0535, lng: 80.2210 },
  Matara: { lat: 5.9485, lng: 80.5364 },
  ColomboFort: { lat: 6.9355, lng: 79.8520 },
  Kurunegala: { lat: 7.4866, lng: 80.3647 },
  Batticaloa: { lat: 7.7339, lng: 81.7082 },
  Trincomalee: { lat: 8.5874, lng: 81.2152 },
};

// Train details
const trains = [
  // Train details (as provided before)
];

// Function to calculate intermediate points
const calculateIntermediatePoint = (start, end, fraction) => {
  const lat1 = start.lat * Math.PI / 180;
  const lng1 = start.lng * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  const lng2 = end.lng * Math.PI / 180;

  const d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng1 - lng2) / 2), 2)));

  const A = Math.sin((1 - fraction) * d) / Math.sin(d);
  const B = Math.sin(fraction * d) / Math.sin(d);

  const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
  const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
  const z = A * Math.sin(lat1) + B * Math.sin(lat2);

  const lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
  const lng = Math.atan2(y, x);

  return { lat: lat * 180 / Math.PI, lng: lng * 180 / Math.PI };
};

// Send train data to the API
const sendTrainData = async (train, currentPosition) => {
  const trainData = {
    ...train,
    latitude: currentPosition.lat,
    longitude: currentPosition.lng,
    time_stamp: new Date().toISOString()
  };

  try {
    const response = await axios.post('http://localhost:3001/api/trains', trainData);
    console.log(`Data sent successfully for ${train.train_name}:`, response.data);
  } catch (error) {
    console.error(`Error sending data for ${train.train_name}:`, error);
  }
};

// Function to simulate train travel
const simulateTrainTravel = (train) => {
  const start = stations[train.start_location];
  const end = stations[train.destination];
  let fraction = 0; // Start at the beginning of the journey
  const speed = train.speed; // Train speed in km/h
  const intervalTime = 1000; // Time interval for updates in milliseconds
  const totalDistance = 58; // Assume a total distance (replace with actual if known)
  const distancePerInterval = (speed * intervalTime) / 3600000; // Distance covered per interval in km

  const intervalId = setInterval(() => {
    fraction += distancePerInterval / totalDistance;
    if (fraction >= 1) {
      fraction = 1;
      clearInterval(intervalId);
    }

    const currentPosition = calculateIntermediatePoint(start, end, fraction);
    sendTrainData(train, currentPosition);
  }, intervalTime);

  // Send initial data immediately
  sendTrainData(train, start);
};

// Start simulation for all trains
const startSimulation = () => {
  trains.forEach(train => simulateTrainTravel(train));
};

module.exports = { startSimulation };
