// Create express app
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Routers
const postsRoute = require("./routes/posts");

// Middlewares: functions executed when a route is hit
// app.use("/posts", (req, res, next) => {
//   console.log("Hello, this is the middleware running");
//   next();
// });
app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoute);

// Create ROUTES
// access at localhost:3000
app.get("/", (req, res) => {
  res.send("We are on home");
});
// access at localhost:3000/posts
// app.get("/posts", (req, res) => {
//   res.send("We are on posts");
// });

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

// Start listening to the server at post 3000 or localhost:3000
app.listen(3000);
