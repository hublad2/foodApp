/* eslint-env node, jest */
const recipes = require("./routes/recipes.js");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/recipe");
const recipeData = { name: "HEHEHE", ingredients: "czosnek" };

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

  it("create & save recipe successfully", async () => {
    const validRecipe = new Recipe(recipeData);
    const savedRecipe = await validRecipe.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedRecipe._id).toBeDefined();
    expect(savedRecipe.name).toBe(recipeData.name);
    expect(savedRecipe.ingredients).toBe(recipeData.ingredients);
  });
});
