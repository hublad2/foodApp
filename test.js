/* eslint-env node, jest */
const recipes = require("./routes/recipes.js");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/recipe");
const User = require("./models/user");
const Schedule = require("./models/schedule");
const userData = { email: "hublad@wp.pl", uid: "2353412412" };

app.use(express.urlencoded({ extended: false }));
app.use("/recipes", recipes);

/* test("index route works", (done) => {
  request(app)
    .get("/recipes")
    .expect("Content-Type", /json/)
    .expect({ name: "Kekw" })
    .expect(200, done);
}); */

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
}); */

describe("Recipe Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("create & save user successfully", async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.uid).toBe(userData.uid);
  });

  it("create & save recipe with author successfully", async () => {
    /* Create user */
    const userData = { email: "hublad@wp.pl", uid: "2353412412" };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    /* Create recipe with author */
    const recipeData = {
      name: "HEHEHE",
      tags: "Śniadanie",
      description: "Siema to ja",
      ingredients: ["czosnek"],
      preparation: "wrzuć do gara",
      author: savedUser._id,
    };
    const validRecipe = new Recipe(recipeData);
    const savedRecipe = await validRecipe.save();

    expect(savedRecipe._id).toBeDefined();
    expect(savedRecipe.name).toBe(recipeData.name);
    expect(savedRecipe.ingredients[0]).toBe(recipeData.ingredients[0]);
    expect(savedRecipe.author).toBe(recipeData.author._id);
  });

  it("create & save schedule successfully", async () => {
    /* Create user */
    const userData = { email: "hublad@wp.pl", uid: "2353412412" };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    /* Create recipe */
    const recipeData = {
      name: "HEHEHE",
      tags: "Śniadanie",
      description: "Siema to ja",
      ingredients: ["czosnek"],
      preparation: "wrzuć do gara",
      author: savedUser._id,
    };
    const validRecipe = new Recipe(recipeData);
    const savedRecipe = await validRecipe.save();

    /* Create recipe with author */
    const scheduleData = {
      author: savedUser._id,
      dates: [
        {
          tags: "Śniadanie",
          date: new Date(Date.now()),
          recipe: savedRecipe._id,
        },
      ],
    };
    const validSchedule = new Schedule(scheduleData);
    const savedSchedule = await validSchedule.save();
    expect(savedSchedule._id).toBeDefined();
    expect(savedSchedule.dates[0].recipe).toBe(savedRecipe._id);
    expect(savedSchedule.author).toBe(savedUser._id);
  });
});
