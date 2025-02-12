import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
// import { watchsocketsidesdata, allsocketData, SideData, Avgchartdash} from '../API/Controller/Socket.Controller.js';
import {
  allsocketData, 
  
  SideData, Avgchartdash, AvgtempModel, Heatmap, Heatmaprange,
  collectorbar,
  latesttimetamp,
  // idfetch
} from '../API/Controller/Socket.Controller.js';

import { verifyAccessToken } from './jwt_helper.js';

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

// watchsocketsidesdata(io)
allsocketData(io)
SideData(io)
Avgchartdash(io)
AvgtempModel(io)
Heatmap(io)
Heatmaprange(io)
collectorbar(io)
latesttimetamp(io)
// idfetch(io)


// verifyAccessToken(allsocketData(io))
// verifyAccessToken(SideData(io))
// verifyAccessToken(Avgchartdash(io))
// verifyAccessToken(AvgtempModel(io))
// verifyAccessToken(Heatmap(io))
// verifyAccessToken(Heatmaprange(io))
// verifyAccessToken(collectorbar(io))
// verifyAccessToken(latesttimetamp(io))
// verifyAccessToken(idfetch(io))


httpServer.listen(process.env.WS_PORT, () => {
  console.log(`WS_Server is running on port ${process.env.WS_PORT}`);
});

export default io;