var express = require("express");
var router = express.Router();

const schedule_controller = require("../controllers/scheduleController");

/* GET user schedule listing. */
router.post("/", schedule_controller.get_user_schedule);

router.post("/add", schedule_controller.post_dateToSchedule);

router.post("/remove", schedule_controller.remove_dateFromSchedule);

module.exports = router;
