const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcyrpt = require('bcryptjs');
const User = require('./models/User');

dotenv.config({ path: './config.env' });
mongoose.connect(
  process.env.MONGODB_URI.replace('<password>', process.env.PASSWORD)
);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcyrpt.genSaltSync(10);

const app = express();
app.use(express.json());
/* ---------------------  FIX CORS CREDENTIOALS ERROR --------------------- */
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(cookieParser());

app.get('/test', async (req, res) => {
  res.json('test ok');
});

/* ------------------------------- LOGIN ROUTE ------------------------------ */
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const foundedUser = await User.findOne({ userName });
  if (foundedUser) {
    const passOk = bcyrpt.compare(password, foundedUser.password);
    if (passOk) {
      jwt.sign();
    }
  }
});

/* ----------------------------- REGISTER ROUTE ----------------------------- */
app.post('/register', async (req, res) => {
  const { userName, password } = await req.body;
  try {
    const hashedPassword = bcyrpt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      userName,
      password: hashedPassword
    });
    jwt.sign(
      {
        _id: req.body._id,
        userName
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).status(201).json({
          _id: createdUser._id,
          userName
        });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json('fail 💥');
  }
});

/* ------------------------------ PROFILE ROUTE ----------------------------- */
app.get('/profile', async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(
      token,
      jwtSecret,
      { sameSite: 'none', secure: true },
      (err, userData) => {
        if (err) throw err;
        const { id, userName } = userData;
        res.json({
          id,
          userName
        });
      }
    );
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'No token provided'
    });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
