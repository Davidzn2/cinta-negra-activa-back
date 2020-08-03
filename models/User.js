const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  is_active: {
    type: Boolean,
    default: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;