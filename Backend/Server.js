const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./Routes/UserRoute");
const ExerciseRoute = require("./Routes/ExerciseRoute");
//For accessing env variables
// require("dotenv").config();

const app = express();
app.use(cors());
//For working with json because your server send Json as a response without this function we can't read Json on req.body
app.use(express.json());
app.use(UserRoute);
app.use(ExerciseRoute);
const url = "mongodb://127.0.0.1:27017/Mern_Stack";
mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    console.log("MongooDB Connection Established Successfully!!!");
  }
);
app.listen(2000, () => {
  console.log("Server Is Running On Port Number " + 2000);
});
