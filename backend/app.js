const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const usersRouter = require("./app/routes/users.routes");
const courseRouter = require("./app/routes/course.routes");
const classRouter = require("./app/routes/class.routes");
const lessonRouter = require("./app/routes/lesson.routes");
const progressRouter = require("./app/routes/progress.routes");
const commentRouter = require("./app/routes/comment.routes");

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome ttnn",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/course", courseRouter);
app.use("/api/progress", progressRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/class", classRouter);
app.use("/api/comment", commentRouter);

// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError("Resource not found", 404));
});

// handle global error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;