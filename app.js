var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const errorHandlers = require("./handlers/errorHandlers");
var spiderRouter = require("./routes/spider");
var usersRouter = require("./routes/users");

var app = express();

app.use(
  cors({
    origin: "http://localhost:3001",

    credentials: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const morganLogStyle = app.get("env") === "development" ? "dev" : "common";
app.use(logger(morganLogStyle));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/", spiderRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler

app.use(errorHandlers.sequelizeErrorHandler);
app.use(errorHandlers.notFound);

// error handler
if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

if (process.env.NODE_ENV === "development") {
  console.log("Environment=Development");
}

if (process.env.NODE_ENV === "production") {
  console.log("Environment=Production");
}

module.exports = app;
