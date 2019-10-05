import React, { Component } from "react";
import axios from "axios";

export default class createExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: "",
    date: new Date()
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
      date: new Date(this.state.date)
    };
    axios
      .patch(
        "http://localhost:2000/Exercise/update/" + this.props.match.params.id,
        exercise
      )
      .then(res => (window.location = "/"))
      .catch(err => console.log(err));
  };
  componentDidMount() {
    axios
      .get("http://localhost:2000/Exercise/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          user: res.data.user,
          description: res.data.description,
          duration: res.data.duration
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.Submit}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              required
              value={this.state.description}
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
              value={this.state.duration}
              id="duration"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
