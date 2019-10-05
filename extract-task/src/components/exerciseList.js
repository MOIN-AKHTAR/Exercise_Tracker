import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function List(prop) {
  return (
    <tr key={prop.user._id}>
      <td>{prop.user.username}</td>
      <td>{prop.user.description}</td>
      <td>{prop.user.duration}</td>
      <td>{prop.user.date.substring(0, 10)}</td>
      <td>
        <a
          href="#"
          onClick={() => {
            prop.DeleteItem(prop.user._id);
          }}
        >
          Delete
        </a>
        | <Link to={"/edit/" + prop.user._id}>Edit</Link>
      </td>
    </tr>
  );
}
class exerciseList extends Component {
  state = {
    Arr: []
  };
  DeleteItem = id => {
    axios
      .delete("http://localhost:2000/Exercise/delete/" + id)
      .then(res => {
        this.setState({
          Arr: this.state.Arr.filter(user => user._id !== id)
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    axios
      .get("http://localhost:2000/Exercise")
      .then(res => {
        try {
          if (res.data.length > 0) {
            this.setState({
              Arr: res.data.map(user => user)
            });
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return this.state.Arr.length === 0 ? (
      <h1 className="text-center text-danger">No Item Found :(</h1>
    ) : (
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.Arr.map(user => {
            return (
              <List user={user} key={user._id} DeleteItem={this.DeleteItem} />
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default exerciseList;
