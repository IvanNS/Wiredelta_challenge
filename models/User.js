const mongoose = require('mongoose');
const UserRole = require('./UserRole');
const Job = require('./Job');
const Company = require('./Company');
const Schema = mongoose.Schema;

let userSchema = new Schema({
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
  user_role:{
    type: Schema.Types.ObjectId,
    ref: "UserRole"
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
  jobs:[{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }],
  companies:[{
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }],
  boats:[{
    type: Schema.Types.ObjectId,
    ref: 'Boat'
  }]
},{timestamps: true });

module.exports = mongoose.model('User',userSchema);