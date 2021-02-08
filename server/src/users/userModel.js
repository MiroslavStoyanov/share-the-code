require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, bcrypt: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  token: { type: String, required: false },
  createdDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, required: false, default: false },
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

UserSchema.plugin(bcrypt);
UserSchema.index({ username: 1, email: 1 });

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET
  );
  user.token = token;
  await user.save();
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.validate = validateUser;
