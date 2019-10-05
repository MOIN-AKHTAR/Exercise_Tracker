import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import createExercise from "./components/createExercise";
import createUser from "./components/createUser";
import exerciseList from "./components/exerciseList";
import editExercise from "./components/editExercise";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={exerciseList} />
        <Route path="/Excercises" component={createExercise} />
        <Route path="/Users" component={createUser} />
        <Route path="/edit/:id" component={editExercise} />
      </BrowserRouter>
    </div>
  );
}

export default App;
