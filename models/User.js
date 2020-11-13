const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	active:{
    type: Boolean,
    default: true
  },
  profile_pic:{
    type: String,
    default: "no-img.jpg"
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  phone_number:{
    type: String,
    maxlength: 8
  },
  address:{
    type: String
  },
  zip_code:{
    type: String,
    minlength: 4
  },
  city:{
    type: String,
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
  updated_at:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User',userSchema);