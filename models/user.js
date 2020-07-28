const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new User({
  username: { type: String },
  password: { type: String },
  googleId: { type: Number },
});

module.exports = mongoose.model("User", UserSchema);
