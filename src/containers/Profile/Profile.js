import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { ProfileForm } from 'components';

@connect(
  state => ({ user: state.user.user })
)
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <section>
        <h1>Profile</h1>
        <ProfileForm
          initialValues={this.props.user}
          onSubmit={this.handleSubmit}
        />
      </section>
    );
  }
}
