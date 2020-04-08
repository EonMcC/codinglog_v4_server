const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.body.username
    });
    let { id, username, languages } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Username/Password do not match any on record."
      });
    }
  } catch (event) {
    return next({
      status: 400,
      message: "Username/Password do not match any on record."
    });
  }
};

exports.deleteAccount = async function(req, res, next) {
  try {
    await db.User.findOneAndDelete({
      _id: req.params.id
    });
    return res.status(200).json({
      id
    });
  } catch (res) {
    return res;
  }
};

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, startTime } = user;
    let token = jwt.sign(
      {
        id,
        username,
        startTime
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      startTime,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
