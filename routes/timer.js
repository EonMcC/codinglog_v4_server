const express = require("express");
const router = express.Router({mergeParams: true});

const {getTime, updateStartTime} = require("../handlers/timer");

router.route("/")
  .get(getTime)
  .patch(updateStartTime);

module.exports = router;