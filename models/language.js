const mongoose = require("mongoose");
const User = require("./user");

const languageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
    maxLenght: 40
  },
  totalTime: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

languageSchema.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.languages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Language = mongoose.model("Language", languageSchema);
module.exports = Language;
