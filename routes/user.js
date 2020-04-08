const express = require("express");
const router = express.Router({ mergeParams: true });

const { updateTheme, getUser } = require("../handlers/user");

router.route("/").get(getUser);
router.route("/theme").patch(updateTheme);

module.exports = router;
