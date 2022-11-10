if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const handleErrors = require("./middleware/handleError");
const router = require("./routes");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const port = process.env.PORT || 3000;
// const cloudinary = require('cloudinary').v2

// const upload = require('../middleware/multer');
const cloudinary = require("./config/cloudinaryConfig");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// })

app.use("/", router);
app.use(handleErrors);
app.use(cloudinary.config);

io.on("connection", (socket) => {
  socket.on("join-room", (customerId) => {
    socket.join(customerId);
  });

  socket.on("updateLocation", ({ location, userId }) => {
    socket.to(userId).emit("sendLocation", location);
    console.log(location, "<<<<<<< update location");
  });
});

// httpServer.listen(3001);

// app.listen(port, () => {
//   console.log(`Bisa bisa`);
// });
module.exports = app;
