const mongoose = require("mongoose");
const moment = require("moment-timezone");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // This will create a unique index on the email field
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
  },
});

UserSchema.pre("save", (next) => {
  this.created = this.created || moment().toDate();
  this.updated = moment().toDate();
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
