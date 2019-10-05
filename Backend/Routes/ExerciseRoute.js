const Exercise = require("../models/exercise");
const ExerciseRoute = require("express").Router();
//=========================================================
ExerciseRoute.get("/Exercise", async (req, res) => {
  const Exercises = await Exercise.find({});
  if (Exercises.length == 0) {
    return res.status(404).send("No Exercise :(");
  }
  res.status(200).send(Exercises);
});
//========================================================
ExerciseRoute.post("/Exercise/add", (req, res) => {
  const exercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: req.body.duration
  });
  exercise
    .save()
    .then(Exercise => res.send(Exercise))
    .catch(err => res.send(err));
});
//=================================================================
ExerciseRoute.get("/Exercise/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).send("Not Found :(");
    }
    res.status(200).send(exercise);
  } catch (e) {
    res.status(400).send(e);
  }
});
//===================================================================
ExerciseRoute.patch("/Exercise/update/:id", async (req, res) => {
  const Keys = Object.keys(req.body);
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return res.status(404).send("No Such Exercise :(");
  }
  const ValidKeys = ["username", "description", "duration", "date"];
  const Valid = Keys.every(Key => ValidKeys.includes(Key));
  if (!Valid) {
    return res
      .status(400)
      .send("These Fields Are Not Allowed Plz Update Valid Fields Only :(");
  }
  Keys.forEach(value => (exercise[value] = req.body[value]));
  await exercise.save();
  res.status(200).send(exercise);
});
ExerciseRoute.delete("/Exercise/delete/:id", async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return res.status(404).send("No Such Exercise :(");
  }
  await exercise.remove();
  res.status(200).send("Exercise Deleted Successfully :)");
});
module.exports = ExerciseRoute;
