const Recipe = require("../models/recipe");
const User = require("../models/user");

exports.get_recipes = async (req, res, next) => {
  try {
    let recipe_list = await Recipe.find().exec();
    res.send(recipe_list);
  } catch (err) {
    return next(err);
  }
};

exports.post_recipe = async (req, res, next) => {
  if ((await Recipe.findOne({ name: req.body.name }).exec()) != null) {
    res.send("Przepis o takiej nazwie już istnieje");
  } else {
    try {
      let recipe = new Recipe({
        name: req.body.name,
        tags: req.body.tags,
        description: req.body.description,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        /* author: req.body.userId, */
      });

      let saveRecipe = await recipe.save();

      res.status(200).json({
        response: "Recipe saved sucessfully",
        recipe: saveRecipe,
      });
    } catch (err) {
      return next(err);
    }
  }
};
