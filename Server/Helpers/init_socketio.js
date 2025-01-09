import {Server} from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import { watchsocketsidesdata, allsocketData} from '../API/Controller/Socket.Controller.js';

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`, // Assuming frontend runs on port 3000
    methods: ["GET", "POST"],
    credentials: true // Add if you need to support credentials
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

watchsocketsidesdata(io)
allsocketData(io)

httpServer.listen(process.env.WS_PORT, () => {
  console.log(`WS_Server is running on port ${process.env.WS_PORT}`);
});

export default io; 