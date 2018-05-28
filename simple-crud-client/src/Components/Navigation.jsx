import React from "react";
import { NavLink } from "react-router-dom";

import "./styles/Navigation.css";

const Navigation = props => (
  <nav>
    <ul>
      <li>
        <NavLink exact activeClassName="current" to="/">
          Users List
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/add">
          Add User
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
