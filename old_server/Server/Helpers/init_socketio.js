import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from 'mongoose';

// require('./init_mongodb');

// Create HTTP server
const httpServer = createServer();

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// MongoDB Change Stream Setup
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Watch a specific collection
  const collection = db.collection("sensormodel1"); // Replace with your collection name
  const changeStream = collection.watch();

  // Listen for changes in the collection
  changeStream.on("change", (change) => {
    console.log("Change detected:", change);

    // Emit real-time updates to connected clients
    io.emit("dataUpdate", change);
  });

  // Handle cleanup when the app shuts down
  process.on("SIGINT", async () => {
    console.log("Closing MongoDB change stream...");
    await changeStream.close();
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });
});

// Export Socket.IO instance for use in other files
export { io };

// Start HTTP server
const PORT = 4000; // Replace with your desired port
httpServer.listen(PORT, () => {
  console.log(`WS_Server is running on port ${PORT}`);
});
