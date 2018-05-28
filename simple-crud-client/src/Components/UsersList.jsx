import React from "react";

import "./styles/UsersList.css";

import User from "./User";

const UsersList = props => (
  <div className="Main-block">
    <h2 className="Main-header">Users List</h2>

    <div>
      {props.users.map(function(user) {
        return (
          <User
            key={user.id}
            user={user}
            onEdit={props.edit}
            onRemove={props.remove}
          />
        );
      })}
    </div>
  </div>
);

export default UsersList;
