import React, { Component } from "react";
import "./Users.css";

const API = "api/";
const QUERY = "users";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = { user: props.user };
  }

  render() {
    return <div>
        <p className="Users-name">{this.state.user.firstName} {this.state.user.lastName}</p>
        <p>{this.state.user.birthYear}&emsp;{this.state.user.city}, {this.state.user.country}</p>
    </div>;
  }
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  loadData() {
    fetch(API + QUERY)
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return <div className="Users">
      <h2 className="Users-header">Users List</h2>

      <div>
        {
          this.state.users.map(function (user) {

            return <User key={user.id} user={user} />
          })
        }
      </div>
    </div>;
  }
}

export default Users;
