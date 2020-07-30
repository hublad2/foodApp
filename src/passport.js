require("dotenv").config();
const User = require("../models/user");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const GoogleStrategy = require("passport-google");
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, cb) {
      let user;
      try {
        user = await User.findOne({ username, password });

        if (!user) {
          return cb(null, false, {
            message: "Incorrect username or password",
          });
        }
      } catch (err) {
        return cb(err);
      }

      return cb(null, user, {
        message: "Logged in Sucessfully",
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtPayload, cb) {
      let user;
      try {
        user = await User.findById(jwtPayload._id);
      } catch (err) {
        return cb(err);
      }

      return cb(null, user);
    }
  )
);
