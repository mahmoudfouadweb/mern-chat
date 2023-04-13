const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

dotenv.config({ path: "./config.env" });
mongoose.connect(
  process.env.MONGODB_URI.replace("<password>", process.env.PASSWORD)
);
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("sucess");
});

app.post("/register", async (req, res) => {
  const { userName, password } = await req.body;
  try {
    const createdUser = await User.create({ userName, password });
    await jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json({
        _id: createdUser._id,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("fail 💥");
  }
});

app.listen(4040, () => console.log("Example app listening on port 4040!"));
