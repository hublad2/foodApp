require("dotenv").config();
const User = require("../models/user");
const Schedule = require("../models/schedule");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "uid",
    },
    async function (email, uid, cb) {
      let user;
      try {
        user = await User.findOne({ email, uid });

        if (!user) {
          let newUser = new User({
            email: email,
            uid: uid,
          });
          let savedUser = await newUser.save();

          let userSchedule = new Schedule({
            author: savedUser._id,
          });
          let savedSchedule = await userSchedule.save();

          return cb(null, savedUser, {
            message: "Created and logged user succesfully",
            user: savedUser,
            schedule: savedSchedule,
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
