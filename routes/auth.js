const express = require("express");
const router = express.Router();
const { signup, signin, deleteAccount } = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/:id/delete-account", deleteAccount);

module.exports = router;
