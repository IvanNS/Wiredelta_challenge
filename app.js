const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');

dotenv.config();
const app = express();

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true , useUnifiedTopology: true },
() => console.log('connected to db'));

app.use(express.json());



app.use('/api/auth', authRoute);
app.listen(3000);