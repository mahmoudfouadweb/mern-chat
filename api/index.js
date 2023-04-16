const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcyrpt = require('bcryptjs');
const User = require('./models/User');
const ws = require('ws');

dotenv.config({ path: './config.env' });
mongoose.connect(
  process.env.MONGODB_URI.replace('<password>', process.env.PASSWORD)
);
const jwtSecretkey = process.env.JWT_SECRET;
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
  const { userName, password } = await req.body;
  const foundedUser = await User.findOne({ userName });
  if (foundedUser) {
    bcyrpt
      .compare(password, foundedUser.password)
      .then(passOk => {
        if (passOk) {
          const payLoad = {
            userId: foundedUser._id,
            userName
          };
          jwt.sign(payLoad, jwtSecretkey, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
              status: 'sucess',
              userId: foundedUser._id
            });
          });
        } else {
          res.json('password incorrect');
        }
      })
      .catch(err => {
        console.log('password error 💥', err);
      });
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
    const payLoad = {
      userId: createdUser._id,
      userName
    };
    jwt.sign(
      payLoad,
      jwtSecretkey,
      { sameSite: 'none', secure: true },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).status(201).json({
          userId: payLoad.userId,
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
      jwtSecretkey,
      { sameSite: 'none', secure: true },
      (err, userData) => {
        if (err) throw err;
        const { userId, userName } = userData;
        res.json({
          id: userId,
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

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

/* ---------------------------- WEB SOCKET SERVER --------------------------- */
const wss = new ws.WebSocketServer({ server });
wss.on('connection', (connection, req) => {
  console.log('a user connected');
  // connection.send('Hello');
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookiesString = cookies
      .split(';')
      .find(str => str.startsWith('token'));
    if (tokenCookiesString) {
      const token = tokenCookiesString.split('=')[1];
      if (token) {
        jwt.verify(token, jwtSecretkey, {}, (err, userData) => {
          if (err) throw err;
          const { userName, userId } = userData;
          connection.userName = userName;
          connection.userId = userId;
        });
      }
    }
  }

  [...wss.clients].forEach(client => {
    client.send(
      JSON.stringify({
        type: 'connected',
        online: [...wss.clients].map(c => ({
          userId: c.userId,
          userName: c.userName
        }))
      })
    );
  });
});
