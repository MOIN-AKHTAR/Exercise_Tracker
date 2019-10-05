const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);
// Instance Based Method
ExerciseSchema.methods.toJSON = function() {
  const Exercise = this;
  const ExerciseObj = Exercise.toObject();
  // delete ExerciseObj._id;
  delete ExerciseObj.__v;
  return ExerciseObj;
};
const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
