import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark container">
        <ul className="navbar-nav">
          <li style={{ marginLeft: "1rem" }}>
            <Link to="/" style={{ color: "white" }}>
              Excercises
            </Link>
          </li>
          <li style={{ marginLeft: "1rem" }}>
            <Link to="/Excercises" style={{ color: "white" }}>
              Create Excercises Log
            </Link>
          </li>
          <li style={{ marginLeft: "1rem" }}>
            <Link to="/Users" style={{ color: "white" }}>
              Create User
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
