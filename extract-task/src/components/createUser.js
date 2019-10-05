import React, { Component } from "react";
import axios from "axios";

export default class createUser extends Component {
  state = {
    user: "",
    password: ""
  };
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  Submit = e => {
    e.preventDefault();
    const user = {
      username: this.state.user,
      password: this.state.password
    };
    e.target.reset();
    axios
      .post("http://localhost:2000/User/add", user)
      .then(res => {
        window.location = "/";
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.Submit}>
          <div className="form-group">
            <label htmlFor="user">User:</label>
            <input
              type="text"
              className="form-control"
              id="user"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create New User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
