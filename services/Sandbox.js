const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:
      "https://fc5e-2404-c0-5c10-00-18f7-9d71.ap.ngrok.ioexp://192.168.82.114:19000",
  },
});

app.get("/", (req, res) => {
  res.json("server running!");
});
io.on("connection", (socket) => {
  socket.on("dapet", (dape) => {
    console.log(dape);
  });

  socket.on("updateLocation", (data) => {
    console.log(data);
  });
  // ..
  // console.log("masuk sini", socket.id);

  // socket.on("updateLocation", (...args) => {
  //   // ...
  //   console.log("dapet location", args);
  // });
});

httpServer.listen(3000);
