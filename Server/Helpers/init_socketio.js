import {Server} from 'socket.io'
import http from 'http'
import './init_mongodb.js'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'; // Import MongoClient
import SensorModel1 from '../API/Models/SensorModel1.js';
dotenv.config()

const httpServer = http.createServer(); // Create HTTP server for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

const mongoClient = new MongoClient(process.env.MONGODB_URI); // Use MONGODB_URI instead of MONGODB_URL

// Connect to MongoDB
mongoClient.connect().then(() => {
  const db = mongoClient.db(process.env.dbName); // Use dbName instead of DB_NAME
  const collection = db.collection('sensormodel1'); // Access the collection

  console.log('Using collection:', collection.collectionName);

  // Listen for client connections
  io.on('connection', (socket) => {
    console.log('A client connected');

    // Fetch data from the collection and emit it
    console.log('Attempting to fetch data from the collection...');
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error('Error fetching data:', err);
        return;
      }
      console.log('Fetched data:', data); // Log the fetched data
      if (data.length === 0) {
        console.log('No data found in the collection.');
      } else {
        console.log(`Fetched ${data.length} documents.`);
      }
      socket.emit('sensorData', data); // Emit the data to the client
    });
  });



// SensorModel1.watch().on('change', (change) => {
//   console.log('Change detected:', change);
//   io.emit('sensorData', change);
// });



}).catch(err => console.error('MongoDB connection error:', err));

// Start the Socket.IO server
httpServer.listen(process.env.WS_PORT, () => {
  console.log(`WS_Server is running on port ${process.env.WS_PORT || 4001}`);
});

export default io; // Change from CommonJS to ES module export
