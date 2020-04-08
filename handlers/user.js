const db = require("../models");

exports.getUser = async function(req, res, next) {
  try {
    let userID = req.params.id;
    let user = await db.User.findOne({ _id: userID });
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

exports.updateTheme = async function(req, res, next) {
  try {
    let userID = req.params.id;
    let theme = req.body.theme;
    let returnTheme = await db.User.findOneAndUpdate(
      { _id: userID },
      { $set: { theme: theme } },
      { upsert: true }
    );
    return res.status(200).json(returnTheme);
  } catch (err) {
    return next(err);
  }
};
