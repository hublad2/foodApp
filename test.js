const recipes = require("./routes/recipes.js");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
/* const Recipe = require("./model/recipe");
const recipeData = { name: "HEHEHE", password: "siema" }; */

app.use(express.urlencoded({ extended: false }));
app.use("/recipes", recipes);

test("index route works", (done) => {
  request(app)
    .get("/recipes")
    .expect("Content-Type", /json/)
    .expect({ name: "Kekw" })
    .expect(200, done);
});

/* test("testing routr works", (done) => {
  request(app)
    .post("/test")
    .type("form")
    .send({ item: "hey" })
    .then(() => {
      request(app)
        .get("/test")
        .expect({ array: ["hey"] }, done);
    });
});

describe("User Model Test", () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it("create & save user successfully", async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.password).toBe(userData.password);
  });
}); */
