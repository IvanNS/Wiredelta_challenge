const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
	is_emergency:{
    type: Boolean,
    default: false
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String
  },
  allow_contact_by_app:{
    type: Boolean
  },
  can_user_bring_boat:{
    type: Boolean
  },
  allow_picking_from_spot:{
    type: Boolean
  },
  allow_repair_on_spot:{
    type: Boolean
  },
  allow_contact_by_phone:{
    type: Boolean
  },
  allow_contact_by_email:{
    type: Boolean
  },
  lat:{
    type: Number
  },
  lng:{
    type: Number
  },
  price:{
    type: Number
  },
  posted:{
    type: Boolean
  },
  due_date:{
    type: Date
  },
  due_time:{
    type: new Date().setTime()
  },
  is_done:{
    type: Boolean
  },
  proposals:[{
    type: Schema.Types.ObjectId,
    ref: 'Proposal'
  }]
},{timestamps: true });

module.exports = mongoose.model('Job',jobSchema);