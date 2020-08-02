const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../src/passport");

exports.user_login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login falied",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);

      return res.json({ user, token });
    });
  })(req, res);
};
