const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

dotenv.config({ path: './config.env' });
mongoose.connect(
  process.env.MONGODB_URI.replace('<password>', process.env.PASSWORD)
);
const jwtSecret = process.env.JWT_SECRET;

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
    console.log(token);
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'No token provided'
    });
  }
});

app.post('/register', async (req, res) => {
  const { userName, password } = await req.body;
  try {
    const createdUser = await User.create({ userName, password });

    await jwt.sign(
      { id: createdUser._id, userName },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).status(201).json({
          _id: createdUser._id, userName
        });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json('fail 💥');
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
