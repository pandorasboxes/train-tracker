let map;
let trainMarkers = {};

// Initialize and display the map
function initMap() {
  // Map options
  const mapOptions = {
    center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka's approximate center
    zoom: 7,
    mapId: '1690a8a23358a72a',  // Optional: use your map ID if you have a custom map style
  };

  // Create map instance
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Fetch and display train data on map load
  fetchTrains();
  
  // Update train markers every 10 seconds
  setInterval(fetchTrains, 10000);
}

// Fetch train data from the REST API
function fetchTrains() {
  fetch('http://localhost:3001/api/trains')
    .then(response => response.json())
    .then(data => {
      updateTrainMarkers(data);
    })
    .catch(error => console.error('Error fetching train data:', error));
}

// Update train markers on the map
function updateTrainMarkers(trains) {
  trains.forEach(train => {
    const { train_name, latitude, longitude } = train;

    // If the marker already exists, update its position
    if (trainMarkers[train_name]) {
      trainMarkers[train_name].setPosition(new google.maps.LatLng(latitude, longitude));
    } else {
      // Create a new marker if it doesn't exist
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: train_name,
      });
      trainMarkers[train_name] = marker;
    }
  });
}
