const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name:{
    type: String,
    required: true
  },
  lat:{
    type: Number
  },
  lng:{
    type: Number
  },
  logo_image_url:{
    type: String
  },
  cvr:{
    type: String,
    minlength: 10,
    maxlength: 10
  },
  is_paid:{
    type:Boolean
  },
  is_enabled:{
    type:Boolean,
    default: true
  },
  is_visible:{
    type:Boolean,
    default: true
  },
  proposals:[{
    type: Schema.Types.ObjectId,
    ref: 'Proposal'
  }]
}, {timestamps: true });

module.exports = mongoose.model('Company',companySchema);