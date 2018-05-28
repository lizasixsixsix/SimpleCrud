import React, { Component } from "react";

import "./styles/UserForm.css";

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

    this.props.submit({
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
      <div className="Main-block">
        <h2 className="Main-header">Add New User</h2>

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
          <input type="submit" value="Submit" className="UserForm-submit" />
        </form>
      </div>
    );
  }
}

export default UserForm;
