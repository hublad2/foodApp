const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* User Schema */
const UserSchema = new User({
  /* Local strategy login info */
  username: { type: String },
  password: { type: String },
  /* Google auth login info */
  googleId: { type: Number },
});

module.exports = mongoose.model("User", UserSchema);
