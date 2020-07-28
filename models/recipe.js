const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Recipe schema */
const RecipeSchema = new Schema({
  name: { type: String, required: true },
  tags: {
    type: String,
    enum: ["Śniadanie", "Obiad", "Kolacja", "Na szybko", "Deser"],
  },
  description: { type: String },
  ingredients: { type: String, required: true },
  preparation: { type: String },
  /* author: { type: Schema.Types.ObjectId, ref: "User", required: true }, */
});

module.exports = mongoose.model("Recipe", RecipeSchema);
