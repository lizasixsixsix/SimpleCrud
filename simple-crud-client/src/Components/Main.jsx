import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./styles/Main.css";

import UsersList from "./UsersList";
import UserForm from "./UserForm";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };

    this.onAddUser = this.onAddUser.bind(this);
    this.onEditUser = this.onEditUser.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
  }

  loadData() {
    fetch(this.props.apiUrl)
      .then(response => response.json())
      .then(data => data.sort((a, b) => a.id < b.id))
      .then(sorted => this.setState({ users: sorted }));
  }

  onAddUser(user) {
    if (user) {
      fetch(this.props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          birthYear: user.birthYear,
          country: user.country,
          city: user.city
        })
      })
        .then(response => response.json())
        .then(data =>
          console.log(`New user ${data.firstName} ${data.lastName} created.`)
        )
        .then(() => this.loadData());
    }
  }

  onEditUser(user) {
    if (user) {
      fetch(`${this.props.apiUrl}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          birthYear: user.birthYear,
          country: user.country,
          city: user.city
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data =>
          console.log(`User ${data.firstName} ${data.lastName} updated.`)
        )
        .then(() => this.loadData());
    }
  }

  onRemoveUser(user) {
    if (user) {
      fetch(`${this.props.apiUrl}/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() =>
          console.log(`User ${user.firstName} ${user.lastName} deleted.`)
        )
        .then(() => this.loadData());
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="Main-layout">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <UsersList
                {...props}
                users={this.state.users}
                edit={this.onEditUser}
                remove={this.onRemoveUser}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={props => <UserForm {...props} submit={this.onAddUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
