const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.json("server running!");
});
io.on("connection", (socket) => {
  // ..
  console.log("masuk sini", socket.id);
  socket.on("updateLocation", (...args) => {
    // ...
    console.log("dapet location", args);
  });
});

// httpServer.listen(3000);
