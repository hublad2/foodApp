const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Recipe schema */
const ScheduleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dates: [
    {
      date: { type: Date, required: true },
      tags: [
        {
          type: [String],
          enum: ["Śniadanie", "Obiad", "Kolacja", "Na szybko", "Deser"],
        },
      ],
      recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    },
  ],
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
