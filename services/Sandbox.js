const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Courier, Customer } = require("./models/index");
const { Socket } = require("dgram");

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
  socket.on("dapet", (dape) => {
  console.log(dape);
  });

  //ini socket room
  socket.on("join-room", (customerId) => {
    socket.join(customerId)
  })
  
  socket.on("updateLocation", ({location, userId}) => {
    socket.to(userId).emit("sendLocation", location)
    console.log(location, "<<<<<<< update location");
  });

  socket.on("nyoba", (location) => {
    console.log(location, "<<<<< masuk client dapet location");
  })

});

httpServer.listen(3000);
