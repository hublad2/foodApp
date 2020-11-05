const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Recipe schema */
const RecipeSchema = new Schema({
  name: { type: String, required: true },
  tags: [
    {
      type: [String],
      enum: ["Śniadanie", "Obiad", "Kolacja", "Na szybko", "Deser"],
    },
  ],
  description: { type: String },
  ingredients: [{ type: [Object], required: true }],
  preparation: [{ type: [Object] }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  photo: { type: String },
  edamamId: { type: Boolean },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
