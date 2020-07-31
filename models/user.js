const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* User Schema */
const UserSchema = new Schema({
  /* Local strategy login info */
  email: { type: String },
  /* Firebase uid login info */
  uid: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
