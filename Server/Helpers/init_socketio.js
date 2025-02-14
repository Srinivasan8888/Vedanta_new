import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import {
  allsocketData,
  SideData,
  Avgchartdash,
  AvgtempModel,
  Heatmap,
  Heatmaprange,
  collectorbar,
  latesttimetamp,
} from '../API/Controller/Socket.Controller.js';
import { verifyAccessToken } from './jwt_helper.js';

dotenv.config();

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`, // Assuming frontend runs on port 3000
    methods: ["GET", "POST"],
    credentials: true, // Add if you need to support credentials
  },
});

// Middleware to verify access token during connection
io.use(async (socket, next) => {
  const { accessToken, userId } = socket.handshake.auth;

  try {
    if (!accessToken || !verifyAccessToken(accessToken)) {
      return next(new Error("Authentication error: Invalid access token"));
    }
    socket.userId = userId; // Attach userId to the socket
    next(); // Proceed if token is valid
  } catch (error) {
    return next(new Error("Authentication error: " + error.message));
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.setMaxListeners(20); // Increased from default 10

  // Attach event listeners
  allsocketData(io);
  SideData(io);
  Avgchartdash(io);
  AvgtempModel(io);
  Heatmap(io);
  Heatmaprange(io);
  collectorbar(io);
  latesttimetamp(io);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(process.env.WS_PORT, () => {
  console.log(`WS_Server is running on port ${process.env.WS_PORT}`);
});

export default io;