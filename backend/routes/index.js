var express = require("express");
var router = express.Router();

const dataStore = {};

/* GET home page. */
router.get("/api/increaseAmount", function (req, res, next) {
  res.json({ title: "Get over here!" });
});

module.exports = router;
