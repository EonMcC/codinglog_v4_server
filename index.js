require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const PORT = process.env.PORT || 8081;
const authRoutes = require("./routes/auth");
const errorHandler = require("./handlers/error");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const languagesRoutes = require("./routes/languages");
const timerRoutes = require("./routes/timer");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/languages",
  loginRequired,
  ensureCorrectUser,
  languagesRoutes
);
app.use("/api/users/:id", userRoutes);
app.use("/api/users/:id/timer", timerRoutes);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 400;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
