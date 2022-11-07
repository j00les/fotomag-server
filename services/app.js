if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const handleErrors = require("./middleware/handleError");
const router = require("./routes");
const dotenv = require('dotenv')
const app = express();
const port = 3000;
// const cloudinary = require('cloudinary').v2
const cloudinary = require('./config/cloudinaryConfig')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_API_CLOUDNAME, 
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// })

app.use("/", router);
app.use(handleErrors);
app.use(cloudinary.config)

// app.listen(port, () => {
//   console.log(`Bisa bisa`);
// });
module.exports = app
