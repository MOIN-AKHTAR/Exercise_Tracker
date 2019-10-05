const UserRoute = require("express").Router();
const User = require("../models/user");
UserRoute.get("/User", (req, res) => {
  User.find()
    .then(Users => res.send(Users))
    .catch(err => res.send(err));
});
UserRoute.post("/User/add", (req, res) => {
  try {
    const user = new User(req.body);
    if (!user) {
      throw new Error();
    }
    user
      .save()
      .then(User => res.send(User))
      .catch(err => res.send(err));
  } catch (err) {
    res.send(err);
  }
});
UserRoute.patch("/User/update/:id", async (req, res) => {
  try {
    const Keys = Object.keys(req.body);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("No Such User :(");
    }
    const ValidKeys = ["username", "password"];
    const Valid = Keys.every(Key => ValidKeys.includes(Key));
    if (!Valid) {
      return res
        .status(400)
        .send("These Fields Are Not Allowed Plz Update Valid Fields Only :(");
    }
    Keys.forEach(value => (user[value] = req.body[value]));
    await user.save();
    res.status(200).send("Updated Successfully :)");
  } catch (e) {
    res.status(400).send(e);
  }
});
UserRoute.delete("/User/delete/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("No Such User Exists :(");
  }
  await user.remove();
  res.status(200).send(user.username + " has been deleted");
});
module.exports = UserRoute;
