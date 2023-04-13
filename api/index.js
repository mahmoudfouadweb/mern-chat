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
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(
  cors()
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { userName, password } = await req.body;
  try {
    const createdUser = await User.create({ userName, password });

    await jwt.sign(
      { userId: createdUser._id, userName },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(201).json({
          _id: createdUser._id,
        });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("fail 💥");
  }
});

app.listen(4040, () => console.log("Example app listening on port 4000!"));
