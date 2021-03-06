const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Job = require('./Job');

const boatSchema = new Schema({
	name:{
    type: String,
    required: true
  },
  year:{
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  engine_serial_number:{
    type: String
  },
  description:{
    type: String
  },
  length:{
    type: Number
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
  }]
},{timestamps: true });

module.exports = mongoose.model('Boat',boatSchema);