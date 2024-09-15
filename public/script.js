let map;
let trainMarkers = [];

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 6.9271, lng: 79.8612 }, // Example: Colombo, Sri Lanka
    zoom: 8,
    mapId: '1690a8a23358a72a'
  });

  // Fetch train data and place markers
  fetchTrainData();
  setInterval(fetchTrainData, 5000); // Fetch train data every 5 seconds
}

async function fetchTrainData() {
  try {
    const response = await fetch('http://localhost:3001/api/trains');
    const trains = await response.json();
    updateTrainMarkers(trains);
  } catch (error) {
    console.error('Error fetching train data:', error);
  }
}

function updateTrainMarkers(trains) {
  // Clear existing markers
  trainMarkers.forEach(marker => marker.map = null);
  trainMarkers = [];

  // Place new markers
  trains.forEach(train => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: train.lat, lng: train.lng },
      map: map,
      title: train.name,
    });

    trainMarkers.push(marker);
  });
}
