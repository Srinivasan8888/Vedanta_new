import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const Test = () => {
    const [sensorData, setSensorData] = useState(null);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);

    const fetchData = () => {
        console.log('Fetching new data...');
        socketRef.current.emit('fetchCollectionTwo');
    };

    useEffect(() => {
        socketRef.current = io('http://localhost:4001');

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server');
            socketRef.current.emit('fetchCollectionTwo');
        });

        socketRef.current.on('collectionTwoData', (data) => {
            console.log('Data received from SensorModel2:', data);
            setSensorData(data);
        });

        socketRef.current.on('error', (err) => {
            console.error('Socket error:', err);
            setError('Error connecting to the server');
        });

        // Cleanup on component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Sensor Data</h1>
            <button onClick={fetchData}>Fetch New Data</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {sensorData ? (
                <pre>{JSON.stringify(sensorData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Test;