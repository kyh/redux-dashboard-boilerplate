import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from 'redux/modules/auth/auth.actions.js';

@connect(
  state => ({ user: state.user.user }),
  { logout }
)
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <section>
        <nav>
          Dashboard
          <Link to="/">Prescriptions</Link>
          <Link to="/history">Order History</Link>
          <Link to="/profile">Profile</Link>
          <a href="" onClick={this.handleLogout}>Logout</a>
        </nav>
        {this.props.children}
      </section>
    );
  }
}
