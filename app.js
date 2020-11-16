const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const companyRoutes = require('./routes/companies');
const boatRoutes = require('./routes/boats');
const proposalRoutes = require('./routes/proposals');
const bodyparser = require('body-parser');



dotenv.config();
const app = express();
app.use(bodyparser.json());

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true , useUnifiedTopology: true },
() => console.log('connected to db'));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/companies',companyRoutes);
app.use('/api/proposals',proposalRoutes);
app.use('/api/boats',boatRoutes);
app.listen(3000);