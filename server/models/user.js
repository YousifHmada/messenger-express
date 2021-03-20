const mongoose = require("mongoose");
const moment = require("moment-timezone");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // This will create a unique index on the email field
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
  },
  updated: {
    type: Date,
  },
});

UserSchema.pre("save", (next) => {
  this.created = this.created || moment().toDate();
  this.updated = moment().toDate();
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
