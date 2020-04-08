const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createLanguage,
  getLanguages,
  updateLanguageTime,
  removeLanguage
} = require("../handlers/languages");

router
  .route("/")
  .post(createLanguage)
  .get(getLanguages);

router
  .route("/:language_id")
  .patch(updateLanguageTime)
  .delete(removeLanguage);

module.exports = router;
