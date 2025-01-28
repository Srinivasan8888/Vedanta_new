import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Test = () => {
    const [aSideData, setASideData] = useState({ timestamps: [], data: {} }); // Store ASide data
    const [bSideData, setBSideData] = useState({ timestamps: [], data: {} }); // Store BSide data
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null); // Store error messages

    useEffect(() => {
        // Initialize WebSocket connection
        const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL);
        setSocket(newSocket);

        // Handle connection errors
        newSocket.on('connect_error', (err) => {
            console.error('WebSocket connection error:', err);
            setError('Failed to connect to the WebSocket server.');
        });

        // Cleanup on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        // Listen for ASide data
        socket.on('ASide', (data) => {
            console.log('Received ASide Data:', data);
            setASideData(data); // Update ASide data state
        });

        // Listen for BSide data
        socket.on('BSide', (data) => {
            console.log('Received BSide Data:', data);
            setBSideData(data); // Update BSide data state
        });

        // Listen for ASiderange data
        socket.on('ASiderange', (data) => {
            console.log('Received ASiderange Data:', data);
            setASideData(data); // Update ASide data state
        });

        // Listen for BSiderange data
        socket.on('BSiderange', (data) => {
            console.log('Received BSiderange Data:', data);
            setBSideData(data); // Update BSide data state
        });

        // Automatically fetch data when the socket is connected
        const requestData = {
            value: 'max',
            startDate: '2025-01-01', // Example start date
            endDate: '2025-01-27',   // Example end date
            side: 'ASide', // or 'BSide'
        };

        socket.emit('requestrangedata', requestData);
        socket.emit('requestData', requestData);

        // Cleanup listeners
        return () => {
            socket.off('ASide');
            socket.off('BSide');
            socket.off('ASiderange');
            socket.off('BSiderange');
        };
    }, [socket]);

    // Function to render data as a table
    const renderTable = (data, title) => {
        if (!data || data.timestamps.length === 0) {
            return <p className="text-red-500">No {title} data available.</p>;
        }

        // Get all keys (columns) from the data object
        const columns = Object.keys(data.data);

        return (
            <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">{title} Data</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border border-gray-300">Timestamp</th>
                                {columns.map((column, index) => (
                                    <th key={index} className="p-2 border border-gray-300">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.timestamps.map((timestamp, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}
                                >
                                    <td className="p-2 border border-gray-300">{new Date(timestamp).toLocaleString()}</td>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="p-2 border border-gray-300">
                                            {data.data[column][rowIndex]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">WebSocket Test</h1>
            {error && <p className="text-red-500">{error}</p>}
            {renderTable(aSideData, 'ASide')}
            {renderTable(bSideData, 'BSide')}
        </div>
    );
};

export default Test;