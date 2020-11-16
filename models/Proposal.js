const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
	date:{
    type: Date
  },
  time:{
    type: new Date().setTime()
  },
  description:{
    type: String
  },
 negotiable:{
    type: Boolean
  },
  status:{
    type: String,
    enum: ['pending','accepted','rejected','canceled'],
    default: 'pending'
  }
},{timestamps: true });

module.exports = mongoose.model('Proposal',proposalSchema);