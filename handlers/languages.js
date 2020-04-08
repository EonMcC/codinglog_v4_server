const db = require("../models");

exports.createLanguage = async function(req, res, next) {
  try {
    let language = await db.Language.create({
      text: req.body.text,
      totalTime: req.body.totalTime,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.languages.push(language.id);
    await foundUser.save();
    let foundLanguage = await db.Language.findById(language._id).populate(
      "user",
      {
        username: true
      }
    );
    return res.status(200).json(foundLanguage);
  } catch (err) {
    return next(err);
  }
};

exports.removeLanguage = async function(req, res, next) {
  try {
    let foundLanguage = await db.Language.findById(req.params.language_id);
    await foundLanguage.remove();
    return res.status(200).json(foundLanguage);
  } catch (err) {
    return next(err);
  }
};

exports.getLanguages = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let userId = foundUser._id;
    let foundLanguages = await db.Language.find({ user: userId });
    return res.status(200).json(foundLanguages);
  } catch (err) {
    return next(err);
  }
};

exports.updateLanguageTime = async function(req, res, next) {
  try {
    let languageID = req.params.language_id;
    let totalTime = req.body.totalTime;
    const language = await db.Language.findOneAndUpdate(
      { _id: languageID },
      { $set: { totalTime: totalTime } },
      { new: true }
    );
    return res.status(200).json(language);
  } catch (err) {
    return next(err);
  }
};
