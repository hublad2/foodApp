var express = require("express");
var router = express.Router();

/* GET recipes */
router.get("/", function (req, res, next) {
  res.json({ name: "Kekw" });
});

module.exports = router;
