const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

dotenv.config({ path: "./config.env" });
mongoose.connect(
  process.env.MONGODB_URI.replace("<password>", process.env.PASSWORD)
);
const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.get("/test", (req, res) => {
  res.json("sucess");
});

app.post("/register", async (req, res) => {
  const { username, password } = await req.body;
  const createdUser = await User.create({ username, password });
  await jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
    if (err) throw err;
    res.cookie("token", token).status(201).json("ok");
  });
  res.status(200).json({ message: "User created" });
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
