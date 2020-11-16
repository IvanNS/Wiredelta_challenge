const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  role:{
    type: String,
    required: true,
  },
  assigned_to:[{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
})


module.exports = mongoose.model("UserRole", UserRoleSchema);