const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs')
const {
  Schema
} = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

UserSchema.methods.hashPasswords = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePasswords = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const User = mongoose.model("User", UserSchema);
module.exports = User;