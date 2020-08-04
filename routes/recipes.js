const express = require("express");
const router = express.Router();

const recipe_controller = require("../controllers/recipeController");

/* GET Get all recipes */
router.get("/", recipe_controller.get_recipes);

/* POST Create new recipe */
router.post("/", recipe_controller.post_recipe);

/* GET Get edamam recipes */
router.post("/edamam", recipe_controller.get_recipies_edamam);

module.exports = router;
