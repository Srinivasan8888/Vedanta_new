import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const Test = () => {
  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('ws://localhost:4001'); // Adjust the URL if needed

    // Listen for the 'sensorData' event
    socket.on('sensorData', (data) => {
      console.log('Received sensor data:', data);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Sensor Data Test</h1>
      <p>Check the console for received sensor data.</p>
    </div>
  );
};

export default Test;
