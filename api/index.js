const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

dotenv.config({ path: "./config.env" });
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.get("/test", (req, res) => {
  res.json("sucess");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  await User.create({ userName, password });
  jwt.sign({userId:createdUser})
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
