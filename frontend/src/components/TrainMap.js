// src/components/TrainMap.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const TrainMap = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch train data
    const fetchTrains = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/trains`);
      setTrains(response.data);
    };

    fetchTrains();

    // WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:5000/ws/locations');
    ws.onmessage = (event) => {
      const updatedTrain = JSON.parse(event.data);
      setTrains((prevTrains) =>
        prevTrains.map(train => train.id === updatedTrain.id ? updatedTrain : train)
      );
    };

    return () => ws.close();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        center={{ lat: 7.8731, lng: 80.7718 }} // Center on Sri Lanka
        zoom={7}
      >
        {trains.map(train => (
          <Marker
            key={train.id}
            position={{
              lat: train.currentLocation.latitude,
              lng: train.currentLocation.longitude,
            }}
            label={train.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default TrainMap;
