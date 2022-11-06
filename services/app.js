if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const handleErrors = require("./middleware/handleError");
const router = require("./routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(handleErrors);

<<<<<<< HEAD

app.listen(port, () => {
  console.log(`Bisa bisa`);
});
// module.exports = app
=======
app.listen(port, () => {
  console.log(`Bisa bisa`);
});
// module.exports = app;
>>>>>>> ea2cb5cfa2b76fe0919383f30f7a95b1efe8c8b3
