import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

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
        </nav>
        {this.props.children}
      </section>
    )
  }
}
