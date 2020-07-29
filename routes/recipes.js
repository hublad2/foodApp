const express = require("express");
const router = express.Router();

const recipe_controller = require("../controllers/recipeController");

/* GET Get all recipes */
router.get("/", recipe_controller.get_recipes);

/* POST Create new recipe */
router.post("/", recipe_controller.post_recipe);
/* router.post("/", function (req, res, next) {
  res.send("To ja");
}); */

module.exports = router;
