import React, { Component } from "react";
import axios from "axios";

export default class createExercise extends Component {
  state = {
    user: "",
    description: "",
    duration: "",
    date: new Date(),
    users: []
  };
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  Submit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.user,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    axios
      .post("http://localhost:2000/Exercise/add", exercise)
      .then(res => {
        window.location = "/";
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    axios
      .get("http://localhost:2000/User")
      .then(res => {
        this.setState({
          users: res.data.map(user => user.username),
          user: this.state.users[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.Submit}>
          <div className="form-group">
            <label htmlFor="user">User:</label>
            <select
              required
              className="form-control"
              value={this.state.user}
              onChange={this.onChange}
              id="user"
            >
              {this.state.users.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              required
              type="text"
              className="form-control"
              id="description"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes):</label>
            <input
              required
              type="text"
              className="form-control"
              id="duration"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
