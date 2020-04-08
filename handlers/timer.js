const db = require("../models");

exports.getTime = async function(req, res, next) {
  try {
    let id = req.params.id;
    let time = await db.User.findOne({_id: id}, {startTime: 1})
    return res.status(200).json(time);
  } catch(err){
    return next(err);
  }
};

exports.updateStartTime = async function(req, res, next) {
  try {
    let id = req.params.id;
    let date = req.body.date;
    await db.User.findOneAndUpdate({_id: id}, {$set:{startTime: date}}, {upsert: true})
    return res.status(200)
  } catch(err){
    return next(err);
  }
};