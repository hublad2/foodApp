const Recipe = require("../models/recipe");
const User = require("../models/user");
const Schedule = require("../models/schedule");
const fetch = require("node-fetch");
const passport = require("passport");
const { filter } = require("async");
require("../src/passport");

/* exports.get_schedules = async (req, res, next) => {
  try {
    let schedules_list = await Schedule.find().exec();
    res.send(schedules_list);
  } catch (err) {
    return next(err);
  }
}; */

exports.get_user_schedule = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const schedule = await Schedule.find({ author: req.body.userId }).exec();
      res.send(schedule);
    } catch (err) {
      return next(err);
    }
  },
];

exports.remove_dateFromSchedule = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    let userSchedule = await Schedule.findOne({
      author: req.body.userId,
    }).exec();

    try {
      let filteredArray = userSchedule.dates.filter(
        (date) => date._id != req.body.dateId
      );
      console.log(filteredArray);

      let savedSchedule = await Schedule.findOneAndUpdate(
        { author: req.body.userId },
        {
          dates: filteredArray,
        }
      ).exec();

      res.status(200).json({
        response: "Date removed from schedule sucessfully",
        schedule: savedSchedule,
      });
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_dateToSchedule = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    let userSchedule = await Schedule.findOne({
      author: req.body.userId,
    }).exec();

    try {
      userSchedule.dates.push({
        date: req.body.date,
        tags: req.body.tags,
        recipe: req.body.recipeId,
      });
      let savedSchedule = await userSchedule.save();

      res.status(200).json({
        response: "Date saved to schedule sucessfully",
        schedule: savedSchedule,
      });
    } catch (err) {
      return next(err);
    }
  },
];
