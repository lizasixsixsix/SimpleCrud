import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import UsersList from './Users/Users';
import registerServiceWorker from './registerServiceWorker';

const API = "api/";
const QUERY = "users";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<UsersList apiUrl={API + QUERY} />, document.getElementById('users'));
registerServiceWorker();
