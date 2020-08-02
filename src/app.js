require("dotenv").config();
/* var createError = require("http-errors"); */
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("../routes/index");
const recipesRouter = require("../routes/recipes");
const authRouter = require("../routes/auth");
const schedulesRouter = require("../routes/schedules");

require("./passport");

const app = express();

app.use(cors());

const mongoDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pig1p.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/recipes", recipesRouter);
app.use("/schedules", schedulesRouter);
app.use("/login", authRouter);

module.exports = app;
