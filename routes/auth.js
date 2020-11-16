const router = require('express').Router();
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Route for registering a user,if it doesn't already exist
router.post('/register', async (req,res) => {
  const salt = await bcrypt.genSalt();
  const passwordHashed = await bcrypt.hash(req.body.password,salt);
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send('User already exists');
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHashed
});
  try{
    const savedUser = await user.save();
    res.send("User successfully registered: " + user.name);
  }catch(err){
    res.status(400).send(err);
  }
});

//Route for logging in the user if it exists and the password matches
router.post('/login', async (req,res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('User does not exist');
  const pass = await bcrypt.compare(req.body.password, user.password);
  if(!pass) return res.status(400).send("Incorrect credentials");

  const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
  res.header('auth-token', token);
});

module.exports = router;