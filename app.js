require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
const recipesRouter = require("./routes/recipes");
var usersRouter = require("./routes/users");

const mongoDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pig1p.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

module.exports = app;
