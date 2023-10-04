const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8000;
const router = express.Router();
const cors = require("cors");
const app = express();
const Router = require("./src/router/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); //* su dung cors
Router(app);

//* tao bang
// const Task = require("./src/models/taskModels.js");
// Task.sync().then(() => {
//   console.log("table created");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
