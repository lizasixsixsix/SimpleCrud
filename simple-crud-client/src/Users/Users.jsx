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
    return (
      <div>
        <p className="Users-name">
          {this.state.user.firstName} {this.state.user.lastName}
        </p>
        <p>
          {this.state.user.birthYear}&emsp;{this.state.user.city},{" "}
          {this.state.user.country}
        </p>
      </div>
    );
  }
}

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      birthYear: "",
      country: "",
      city: ""
    };

    this.onSubmit = this.onSubmit.bind(this);

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onBirthYearChange = this.onBirthYearChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
  }

  onFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  onLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  onBirthYearChange(e) {
    this.setState({ birthYear: e.target.value });
  }

  onCountryChange(e) {
    this.setState({ country: e.target.value });
  }

  onCityChange(e) {
    this.setState({ city: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var birthYear = this.state.birthYear;
    var country = this.state.country;
    var city = this.state.city;

    if (!(firstName && lastName && birthYear && country && city)) {
      return;
    }

    this.props.onUserSubmit({
      firstName: firstName,
      lastName: lastName,
      birthYear: birthYear,
      country: country,
      city: city
    });

    this.setState({
      firstName: "",
      lastName: "",
      birthYear: "",
      country: "",
      city: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>
          <input
            type="text"
            placeholder="First name"
            value={this.state.firstName}
            onChange={this.onFirstNameChange}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={this.onLastNameChange}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Birth year"
            value={this.state.birthYear}
            onChange={this.onBirthYearChange}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Country"
            value={this.state.country}
            onChange={this.onCountryChange}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={this.onCityChange}
          />
        </p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };

    this.onAddUser = this.onAddUser.bind(this);
  }

  loadData() {
    fetch(API + QUERY)
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }

  onAddUser(user) {
    if (user) {
      fetch(API + QUERY, {
        method: "post",
        headers: {
          "content-type": "application/json"
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

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="Users-layout">
        <div className="Users-block">
          <h2 className="Users-header">Users List</h2>

          <div>
            {this.state.users.map(function(user) {
              return <User key={user.id} user={user} />;
            })}
          </div>
        </div>

        <div className="Users-block">
          <h3 className="Users-header">Add New User</h3>

          <UserForm onUserSubmit={this.onAddUser} />
        </div>
      </div>
    );
  }
}

export default Users;
