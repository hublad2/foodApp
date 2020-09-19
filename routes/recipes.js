const express = require("express");
const router = express.Router();

const recipe_controller = require("../controllers/recipeController");

/* Get user recipes */
router.post("/user", recipe_controller.get_recipes);

/* Get recipe by ID */
router.post("/get", recipe_controller.get_recipe_byId);

/* Create new recipe */
router.post("/", recipe_controller.post_recipe);

/* Get edamam recipes */
router.post("/edamam", recipe_controller.get_recipies_edamam);

/* Remove recipe by name */
router.post("/remove", recipe_controller.remove_recipe);

/* Update recipe by name */
router.post("/update", recipe_controller.update_recipe);

module.exports = router;
