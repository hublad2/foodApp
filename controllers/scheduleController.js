const Recipe = require("../models/recipe");
const User = require("../models/user");
const Schedule = require("../models/schedule");
const fetch = require("node-fetch");
const passport = require("passport");
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
