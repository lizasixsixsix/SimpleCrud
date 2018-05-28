import React, { Component } from "react";

import "./styles/User.css";

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
      <div className="User">
        <div className="User-info">
          <p className="Main-name">
            {firstName} {lastName}
          </p>
          <p>
            {birthYear}&emsp;{city}, {country}
          </p>
        </div>
        <p>
          <button onClick={this.onEditClick}>
            {this.state.editable ? "Submit" : "Edit"}
          </button>
          <button onClick={this.onRemoveClick}>Remove</button>
        </p>
      </div>
    );
  }
}

export default User;
