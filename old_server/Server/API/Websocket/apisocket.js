import { io } from '../Helpers/init_socketio.js';

import SensorModel1 from '../Models/SensorModel1.js'; // Import your SensorModel1
import SensorModel2 from '../Models/SensorModel2.js'; // Import your SensorModel2
import SensorModel3 from '../Models/SensorModel3.js'; // Import your SensorModel3
import SensorModel4 from '../Models/SensorModel4.js'; // Import your SensorModel4
import SensorModel5 from '../Models/SensorModel5.js'; // Import your SensorModel5
import SensorModel6 from '../Models/SensorModel6.js'; // Import your SensorModel6
import SensorModel7 from '../Models/SensorModel7.js'; // Import your SensorModel7
import SensorModel8 from '../Models/SensorModel8.js'; // Import your SensorModel8
import SensorModel9 from '../Models/SensorModel9.js'; // Import your SensorModel9
import SensorModel10 from '../Models/SensorModel10.js'; // Import your SensorModel10

const mongoClient = new MongoClient(process.env.MONGODB_URI); // Use your MongoDB URI

const initSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust this according to your needs
      methods: ["GET", "POST"]
    }
  });

  socket.on('newAsideData', (newData) => {
    console.log('New sensor data for Aside received:', newData);
    // Handle the new data (e.g., update the UI)
  });
  
  // Listen for new sensor data for Bside
  socket.on('newBsideData', (newData) => {
    console.log('New sensor data for Bside received:', newData);
    // Handle the new data (e.g., update the UI)
  });

  // Connect to MongoDB
  mongoClient.connect().then(() => {
    const db = mongoClient.db(process.env.dbName); // Use your database name

    // Array of sensor collections for Aside
    const sensorCollectionsAside = [
      db.collection('SensorModel1'),
      db.collection('SensorModel2'),
      db.collection('SensorModel3'),
      db.collection('SensorModel4'),
      db.collection('SensorModel5'),
      db.collection('SensorModel6')
    ];

    // Watch for changes in each sensor collection for Aside
    sensorCollectionsAside.forEach((collection) => {
      const changeStream = collection.watch();
      
      changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
          const newData = change.fullDocument; // Get the new document
          io.emit('newAsideData', newData); // Emit the new data to clients
        }
      });
    });

    // Array of sensor collections for Bside
    const sensorCollectionsBside = [
      db.collection('SensorModel7'),
      db.collection('SensorModel8'),
      db.collection('SensorModel9'),
      db.collection('SensorModel10')
    ];

    // Watch for changes in each sensor collection for Bside
    sensorCollectionsBside.forEach((collection) => {
      const changeStream = collection.watch();
      
      changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
          const newData = change.fullDocument; // Get the new document
          io.emit('newBsideData', newData); // Emit the new data to clients
        }
      });
    });
  }).catch(err => console.error(err));

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default initSocketIO;