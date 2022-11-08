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

  socket.on("loc", (get, lol) => {
    console.log(lol);
    console.log(get);
    socket.join(get);
  });

  // io.sockets.on('connection', function(socket) {
  //   socket.on('create', function(room) {
  //     socket.join(room);
  //   });

  // ..
  // console.log("masuk sini", socket.id);

  // socket.on("updateLocation", (...args) => {
  //   // ...
  //   console.log("dapet location", args);
  // });
});

httpServer.listen(3000);
