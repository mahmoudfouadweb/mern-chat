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
/* ---------------------  FIX CORS CREDENTIOALS ERROR --------------------- */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { userName, password } = await req.body;
  try {
    const createdUser = await User.create({ userName, password });

    await jwt.sign(
      { id: createdUser._id, userName },
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

app.get("/user/:userId", async (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: {},
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
