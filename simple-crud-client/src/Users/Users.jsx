import React, { Component } from "react";
import "./Users.css";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      editable: false
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onEditClick(e) {
    if (this.state.editable) {
      let id = this.props.user.id;

      let firstName = this.firstName.value;
      let lastName = this.lastName.value;
      let birthYear = this.birthYear.value;
      let country = this.country.value;
      let city = this.city.value;

      let user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        country: country,
        city: city
      };
      this.props.onEdit(user);
    }

    this.setState({
      editable: !this.state.editable
    });
  }

  onRemoveClick(e) {
    this.props.onRemove(this.state.user);
  }

  render() {
    let firstName = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.firstName = input)}
        defaultValue={this.props.user.firstName}
      />
    ) : (
      <a>{this.props.user.firstName}</a>
    );

    let lastName = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.lastName = input)}
        defaultValue={this.props.user.lastName}
      />
    ) : (
      <a>{this.props.user.lastName}</a>
    );

    let birthYear = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.birthYear = input)}
        defaultValue={this.props.user.birthYear}
      />
    ) : (
      <a>{this.props.user.birthYear}</a>
    );

    let country = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.country = input)}
        defaultValue={this.props.user.country}
      />
    ) : (
      <a>{this.props.user.country}</a>
    );

    let city = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.city = input)}
        defaultValue={this.props.user.city}
      />
    ) : (
      <a>{this.props.user.city}</a>
    );

    return (
      <div>
        <p className="Users-name">
          {firstName} {lastName}
        </p>
        <p>
          {birthYear}&emsp;{city}, {country}
        </p>
        <p>
          <button onClick={this.onEditClick}>
            {this.state.editable ? "Submit" : "Edit"}
          </button>
          &emsp;
          <button onClick={this.onRemoveClick}>Remove</button>
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
    this.onEditUser = this.onEditUser.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
  }

  loadData() {
    fetch(this.props.apiUrl)
      .then(response => response.json())
      .then(data => this.setState({ users: data }))
      .then(() => this.state.users.sort((a, b) => a.id < b.id));
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
    let edit = this.onEditUser;
    let remove = this.onRemoveUser;

    return (
      <div className="Users-layout">
        <div className="Users-block">
          <h2 className="Users-header">Users List</h2>

          <div>
            {this.state.users.map(function(user) {
              return (
                <User
                  key={user.id}
                  user={user}
                  onEdit={edit}
                  onRemove={remove}
                />
              );
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
