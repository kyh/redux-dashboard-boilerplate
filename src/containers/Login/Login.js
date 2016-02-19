import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as authActions from 'redux/modules/auth/auth.actions.js';

// const logo = require('images/logo.svg');
require('./Login.scss');

@connect(
  state => ({ auth: state.auth }),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const [email, password] = [this.refs.email.value, this.refs.password.value];
    const creds = {
      email: email.trim(),
      password: password.trim()
    };

    this.props.login(creds);
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="login__input-wrapper">
          <input name="email" type="email"
            placeholder="Email"
            ref="email"
            required
          />
          <input name="password" type="password"
            placeholder="Password"
            ref="password"
            required
          />
        </div>

        <div className="login__submit-wrapper">
          <button className="login__submit-button" type="submit">
            Login
          </button>

          <div className="text-center">
            <a className="login__forget-button">I forgot my password</a>
          </div>

          <div className="text-center">
            Need an account? <a href="#">Sign Up</a>
          </div>
        </div>

      </form>
    );
  }
}

// <a href="https://tinyrx.com">
//   <img className="login-logo" src={ logo } alt="TinyRx logo" />
// </a>
